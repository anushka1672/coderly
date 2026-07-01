const express =  require("express");
const OpenAI = require("openai");
const {  validationForAi} = require("../utils/validation");
const dotenv = require('dotenv')
const aiRouter = express.Router()
dotenv.config()



const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});



aiRouter.post("/profile/review",async(req,res)=>{
  try{
    const { firstName,lastName,imgUrl,age} = req.body;

    validationForAi(req.body) 

 const response = await client.responses.create({
  model: "openai/gpt-oss-20b",

  input: `
    You are a dating profile reviewer.

    Analyze this profile and give:
    1. Profile strength score out of 10
    2. Strong points
    3. Weak points
    4. Suggestions to improve
    5. Overall attractiveness of profile

    Profile Details:
    First Name: ${firstName}
    Last Name: ${lastName}
    Age: ${age}
    Image URL: ${imgUrl}

    Keep the answer in 50 words only.
  `,
});

console.log(response.output_text);

res.json({
  success: true,
  feedback: response.output_text,
});

  

    }catch(err){
      console.log("FULL ERROR:");
  console.log(err);

  console.log("ERROR MESSAGE:");
  console.log(err.message);

  console.log("ERROR RESPONSE:");
  console.log(err.response?.data);

  res.status(500).json({
    feedback: err.message,
  });
    }
})

module.exports = {aiRouter}