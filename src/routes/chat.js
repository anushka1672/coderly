const express = require("express");
const { userAuth } = require("../middlewares/auth");
const Chat = require("../models/chat");

const chatRouter = express.Router();

chatRouter.get("/chat/:targetId",userAuth,async(req,res)=>{
   const { targetId}= req.params;
   const userId = req.user._id;
   try{
   let chat = await Chat.findOne({
                participents :{$all:[userId,targetId]}
            }).populate({
                path:"messages.senderId",
                select:"firstName lastName"
            })

            if(!chat){
                 chat = new Chat({
                 participents :[userId,targetId ] ,
                 messages:[]
                })
            }
        await chat.save();
        res.json(chat);

   }catch(err){
   console.log(err);
   
   }

})
module.exports = {chatRouter}
