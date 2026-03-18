const express = require("express")
const app = express();

app.use("/",(req,res)=>{
    res.send("hello anushka jiiiiii how are uhh")
})
app.use("/test",(req,res)=>{
    res.send("this is a test page")
})

app.listen(7777);