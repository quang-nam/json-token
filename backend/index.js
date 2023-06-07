const express= require('express');
const cors= require('cors');
const mongoose= require('mongoose');
const cookieParser= require('cookie-parser');
const dotenv= require('dotenv');
const authRoute = require('./routes/auth')
const userRoute= require('./routes/user')
const app = express();
dotenv.config()
mongoose.connect(process.env.MONGODB_URL,
  console.log('Mongoose Connect'))
app.use(cors())
app.use(cookieParser())// tao cookie va gan cookie 
app.use(express.json())// req, res duoi dang json 
// routes
app.use("/v1/auth",authRoute)
app.use('/v1/user',userRoute)
app.listen(8000,()=>{
  console.log('Server is running ')
})