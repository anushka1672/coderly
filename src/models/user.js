const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("email is not valid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("password is not valid");
        }
      },
    },
    age: {
      type: Number,
      validate(value) {
        if (value < 18) {
          throw new Error("age must be above 18");
        }
      },
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("gender data is not valid");
        }
      },
    },
    about: {
      type: String,
      default: "this is the default about the user",
    },
    skills: {
      type: [String],
      maxLength: 50,
      validate(value) {
        if (value.length > 2) {
          throw new Error("skills limit excides");
        }
      },
    },
    imgUrl:{
      type:String,
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
     

    }
  },
  {
    timestamps: true,
  },
);

userSchema.methods.getJwt = async function(){
  const user = this;
   const token =  await jsonwebtoken.sign({_id:user._id},"kuchbhi",{expiresIn:"1d"})
   return token

}
userSchema.methods.validatePassword = async function(passwordInputByUser){
  const user = this;
  const password = passwordInputByUser
  const IsPasswordValid = await bcrypt.compare(password,user.password);
  return IsPasswordValid

}

module.exports = mongoose.model("User", userSchema);
