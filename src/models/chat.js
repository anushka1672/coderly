const { Message$ } = require("@aws-sdk/client-ses")
const { default: mongoose } = require("mongoose")
const mongooes = require("mongoose")


const messageSchema = new mongooes.Schema({
      senderId:{
        type:mongooes.Schema.Types.ObjectId,
        ref:"User",
        required:true, 
    },
    text:{
        type:String,
        required:true,
      },

},{timestamps: true })
const chatSchema = new mongooes.Schema({
   participents :[
    {type:mongooes.Schema.Types.ObjectId,ref:"User",required:true}
   ],
   messages:[messageSchema]
})


module.exports = new mongoose.model("Chat",chatSchema)
