const express = require("express");
const cors = require("cors");
const User = require("./models/user");
const {validationSignupData} = require("./utils/validation");
const connectDB = require("./config/database");
const bcrypt = require("bcrypt");
const  cookieParser= require("cookie-parser");

// const {userAuth} = require("./middlewares/auth.js")
const  {authRouter}= require("./routes/auth.js");
const {profileRouter} = require("./routes/profile.js")
const requestRouter= require("./routes/request.js")
const userRouter= require("./routes/user.js")

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));



app.use(express.json());
app.use(cookieParser());

app.use("/",authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);





app.get("/user", async (req, res) => {
  const userEmail = req.body.email;
  console.log(userEmail);

  try {
    if (userEmail) {
      const user = await User.findOne({ email: userEmail });
      res.send(user);
    } else {
      res.send("user not exist");
    }
  } catch (err) {
    res.status(400).send("error is occured", err.message);
  }
});

// app.get("/feed",async (req,res)=>{
//   try{
// const user = await User.find({})
//     res.send( user)
//   }catch(err){
//       res.status(400).send("error is occured",err.message)
//     }
// })

app.delete("/user", async (req, res) => {
  const id = req.body.userId;
  try {
    await User.findByIdAndDelete(id);
    res.send("user is deleted succesfully");
  } catch (err) {
    res.status(400).send("error is occured", err.message);
  }
});


app.patch("/user/:userId", async (req, res) => {
  const id = req.params.userId
  const data = req.body;
  try {
    const allowedKeys = ["age",'gender',"about","skills"]
  const isUpdationAllowed = Object.keys(data).every((k)=>allowedKeys.includes(k))
  if(!isUpdationAllowed){
    throw new Error("update is not allowed")
  }
    await User.findByIdAndUpdate(id,req.body,{
        runValidators: true, // ✅ validation chalega
        new: true // ✅ updated data return karega
      });
    res.send("user is updated succesfully");
  } catch (err) {
    res.status(400).send("error is occured"+ err.message);
  }
});

connectDB()
  .then(() => {
    app.listen(7777, () => {
      console.log("Server started on port 7777");
    });
  })
  .catch((err) => {
    console.log("Database cannot be connected", err);
  });
