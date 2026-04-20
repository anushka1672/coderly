const jwt = require("jsonwebtoken");
const User = require("../models/user");
const cookieParser = require('cookie-parser');

console.log("User model:", User); 

const userAuth = async(req,res,next)=>{
    try{
  const cookie = req.cookies;
    const {token} = cookie;

    if(!token){
      return  res.status(404).send("token is not present");  
    }else{
         const decodedValue =  await jwt.verify(token,"kuchbhi");
        const {_id} = decodedValue;
        const user = await User.findOne({ _id: _id });
        if(!user){
            res.status(404).send("user not found")
        }
        req.user = user;
        next();
    }}
        catch (err) {
    res.status(400).send("error is occured"+err.message);
  }
    }




module.exports = {userAuth}