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
    if (!validateEditFields(req)) {
      res.status(400).send("field can not be edited");
    }

    const user = req.user;
    console.log("phle wala user", user);

    const updates = Object.keys(req.body);

    updates.forEach((update) => {
      user[update] = req.body[update];
    });

    await user.save();
    console.log("badla hua user", user);

    res.send("user edited successfully" + user);
  } catch (err) {
    res.status(400).send("error is occured" + err.message);
  }
});

module.exports = { profileRouter };
