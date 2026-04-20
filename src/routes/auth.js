const {validationSignupData} = require("../utils/validation");
const { model } = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const express =  require("express");

const {userAuth} = require("../middlewares/auth")
const authRouter = express.Router();


authRouter.post("/signup", async(req, res) => {
  console.log(req.body);
  const {password, firstName,lastName,email,imgUrl} = req.body
  try {
  validationSignupData(req.body);

  const hashedPassword =await  bcrypt.hash(password,10);
  const user = User({
    firstName,lastName,email,password:hashedPassword,
      imgUrl: imgUrl || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  });
    await user.save();
    res.send("user successfully saved");
  } catch (err) {
    res.status(400).send("error is occured"+err.message);
  }
});





authRouter.post("/login",async(req,res)=>{ 
  const {email,password}  = req.body;
    // validationSignupData(req.body);
    try{
      const user =  await User.findOne({email:email});
  if(!user){
  return res.status(404).send("invalid credentials")
}
 const IsPasswordValid =await user.validatePassword(password)
// const correctPassword = await bcrypt.compare(password,user.password);
if(IsPasswordValid){
  // const token =  await jsonwebtoken.sign({_id:user._id},"kuchbhi")
  const token =await user.getJwt()
  res.cookie("token",token);
  res.send(user);
}else{
 return res.status(404).send("invalid credencials")   
} 
}catch (err) {
  res.status(400).send("error is occured"+err.message);
}
})





authRouter.post("/logout",userAuth,async(req,res)=>{
  try{

    res.cookie("token", null, { expires: new Date(0), httpOnly: true });
    res.status(200).send("logout successfully")   
  }catch(err){
    res.status(404).send("error is occured"+err.message);
  }
})






module.exports= {authRouter}