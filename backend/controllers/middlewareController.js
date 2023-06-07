const jwt= require('jsonwebtoken');
// middleware được khai sinh để xác thực xem mày là ai 
const middlewareController={
 
    // verifyToken:(req,res,next)=>{
    //     const token = req.headers.token;
    //     if(!token){
    //         res.status(401).json('You are not authenticated')
    //     }else{
    //         const accessToken = token.split(" ")[1];
    //         jwt.verify(accessToken,process.env.JWT_ACCESS_KEY,(err,user)=>{
    //             if(err){
    //                 res.status(403).json('You are not allow to access it')
    //             }else{
    //                 // nguoi dang dang nhap la nguoi dung chuan roi
    //                 req.user = user;
    //                 next()
    //             }
    //         })
    //     }
    // },
    verifyToken:(req,res,next)=>{
        const token = req.headers.token;
        if(!token){
            res.status(401).json('You are not authenticated')
        }else{
            jwt.verify(token, process.env.JWT_ACCESS_KEY,(err,user)=>{
                if(err){
                    return res.status(403).json('You are not allowed to acces it')
                }else{
                    req.user= user;
                    next();
                }
            })
        }
    },
    // xác thực chính minh user hay là admin 
    verifyTokenAndAdmin:(req,res,next)=>{
        middlewareController.verifyToken(req,res,()=>{// không cần gõ verfyToken lại 
            // id cua minh = id cua nguoi minh muon xoa
            if(req.user.id ===req.params.id || req.user.admin){
                next()
            }else{
                res.status(403).json('You are not allowed to delete other')
            }
        })
    }
}
module.exports= middlewareController;