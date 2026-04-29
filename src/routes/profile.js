const express = require("express");
const User = require("../models/user");
const { validateEditFields } = require("../utils/validation");
const { userAuth } = require("../middlewares/auth.js");

const profileRouter = express.Router();

profileRouter.get("/profile", userAuth, async (req, res) => {
 
  try {
    const user = req.user;
    console.log("purana user", user);

    res.send( user);
  } catch (err) {
    res.status(400).send("error is occured" + err.message);
  }
});


profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
     console.log("Full req.body:", req.body);
    if (!validateEditFields(req)) {
      res.status(400).send("field can not be edited");
    }

    const user = req.user;
    console.log("phle wala user", user);

   
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      req.body ,  // $set will add gender field even if it didn't exist
      { 
        new: true,          // Return updated document
        runValidators: true // Run validation for gender
      }
    )

    if (!updatedUser) {
      return res.status(404).send("User not found");
    }

    console.log("badla hua user", updatedUser);

    res.send("user edited successfully" + updatedUser);
  } catch (err) {
    res.status(400).send("error is occured" + err.message);
  }
});

module.exports = { profileRouter };
