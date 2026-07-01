const express = require("express");
const app = express();
require("dotenv").config();
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
const {aiRouter} = require("./routes/ai.js");
const { initializeSocket } = require("./utils/socket.js");
const http = require("http");
const { chatRouter } = require("./routes/chat.js");
const server = http.createServer(app)
 initializeSocket(server)



app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
    ],
    credentials: true,
  })
);



app.use(express.json());
app.use(cookieParser())

app.use("/",authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/", aiRouter);
app.use("/", chatRouter);


connectDB()
  .then(() => {
    server.listen(7777, () => {
      console.log("Server started on port 7777");
    });
  })
  .catch((err) => {
    console.log("Database cannot be connected", err);
  });
