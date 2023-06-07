const User= require('../models/User')// model vừa làm 
const bcrypt= require('bcrypt');//has password 
const jwt= require('jsonwebtoken');
let refreshTokens=[];
const authController= {
    // register
    registerUser: async (req,res)=>{
      try{
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password,salt);
        // create new user
        const newUser =   new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })
        // save to db
        const user = await newUser.save()
        res.status(200).json(user);
      }catch(err){
        res.status(500).json(err);
      }
    },
  
    generateAccessToken:(user)=>{
        return jwt.sign({
            id: user.id,
            admin: user.admin// check if admin or not, trong database 
        }, process.env.JWT_ACCESS_KEY,
        {expiresIn:"120s"})// vuot qua thoi gian het han thi khong lam gi duoc 
    },
    // generating refresh token- sign ( similar)
    generateRefreshToken: (user)=>{
       return jwt.sign({
            id: user.id,// id user them vao access token
            admin: user.admin// co phai admin khong
        },
        process.env.JWT_REFRESH_TOKEN,
        {expiresIn:"30d"}
        );
    },

    // login user: dieu kien sai dung return 
    loginUser: async(req,res)=>{
        try{
            const user = await User.findOne({username: req.body.username});
            if(!user){
                res.status(404).json('User not found');
            }
            const validPassword= await bcrypt.compare(
                req.body.password,
                user.password
            )
            if(!validPassword){
                res.status(404).json('Password wrong');
            }
            if(user && validPassword){
                // tao jwt access token
                const accessToken=authController.generateAccessToken(user)
                // tao refresh token
                const refreshToken=authController.generateRefreshToken(user);
                refreshTokens.push(refreshToken);// add refresh token to array 
                res.cookie("refreshToken",refreshToken,{
                    httpOnly:true,// http only cookie
                    path:"/",// có thể không có
                    sameSite:"strict",// http request chi den tu site nay thoi,stop csrf
                    secure:false // lam thi de la false, deploy thi true 
                })
                const {password,...others}=user.toJSON();
                res.status(200).json({...others,accessToken})// khong hien password
                // co xuat hien cua access token
            }
        }catch(err){
            console.log(err)
            res.status(500).json(err)
        }
    },

    // redis store refresh token
    // redux store => access token 
    // httponly cookie => refresh token 
    requestRefreshToken: async(req, res)=>{
       const refreshToken =await req.cookie.refreshToken
       if(!refreshToken){
        return res.status(401).json("You are not authenticated")
       }
       if(!refreshTokens.includes(refreshToken)){
        return res.status(401).json("Refresh token is not valid")
       }
       jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN,(err,user)=>{
         if(err){
            console.log(err)
         }
         refreshTokens= refreshTokens.filter(token=>
            token!==refreshToken)
            const newAccessToken = authController.generateAccessToken(user)
            const newRefreshToken = authController.generateRefreshToken(user)
            refreshTokens.push(newRefreshToken);
            res.cookie('refreshToken',newRefreshToken,{
              httpOnly: true,
              sameSite: true,
              secure: false,
              path: '/'
            })
            res.status(200).json({accessToken: newAccessToken})
       })
       
    },
    // log out 
    userLogout: async(req,res)=>{
        // clear refresh token: xác định bởi tham số name 
        // reset array lai
        // access token stored in redux store => phai bien mat
        res.clearCookie("refreshToken");
        refreshTokens= refreshTokens.filter(token => token !== req.cookies.refreshToken)
        res.status(200).json("Log out....")
    }
}
// store token
// local storage: de bi tan cong 
module.exports = authController;