const mongoose = require('mongoose')
const {Schema}= mongoose
const user = new Schema({
    username:{
        type: String,
        required: true,
        minlength: 4,
        maxLength: 20,
        unique: true
    },
    email:{
        type: String,
        required: true,
        minlength:10,
        maxLength:30,
        unique:true
    },
    password:{
        type: String,
        required: true,
        minlength: 6
    },
    admin:{
        type: Boolean,
        default: false// bat ki dang ki vao ban dau la false 
    }
},{
    timestamps: true
})
module.exports = mongoose.model('User',user)