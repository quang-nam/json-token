
const User = require('../models/User');
const userController={
    getAllUsers: async(req,res)=>{
        try{
            const user= await User.find();
            res.status(200).json(user)
        }catch(err){
            res.status(500).json(err)
        }
    },
    // delete user
    delete: async(req,res)=>{
        try{// v1/user/123 (123 is id)
            await User.findById(req.params.id);
            res.status(200).json("delete successfully")
        } catch(err){
            res.status(500).json("delete failed")
        }
    }
}
module.exports =userController