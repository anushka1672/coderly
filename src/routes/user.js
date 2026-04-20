const express = require("express");
const { userAuth } = require("../middlewares/auth");
const userRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

// kis kis ne rquest send ki h mujhge interested ki

userRouter.get("/user/request", userAuth, async (req, res) => {
  try {
    const loggedinUser = req.user;
    const allRequests = await ConnectionRequest.find({
      toUserId: loggedinUser._id,
      status: "interested",
    }).populate("fromUserId", ["firstName"]);

    res.json({ msg: "all request successfully fetched", data: allRequests });
  } catch (err) {
    res.status(404).send("error is occured" + err.message);
  }
});

// all the interseted request that i send to ppls
// kis kis ko mene send ki h interseted ki

userRouter.get("/user/connections/intersted", userAuth, async (req, res) => {
  try {
    const loggedinUser = req.user;
    const connections = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedinUser._id, status: "interested" }],
    }).populate("toUserId", ["firstName"]);
    res.json({
      msg: "all request successfully fetched of intersted ssssss",
      data: connections,
    });
  } catch (err) {
    res.status(404).send("error is occured" + err.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedinUser = req.user;
    const connections = await ConnectionRequest.find({
      $or: [
        { fromUserId: loggedinUser._id, status: "accepted" },
        { toUserId: loggedinUser._id, status: "accepted" },
      ],
    });
    res.json({
      msg: "all request successfully fetched of accepted",
      data: connections,
    });
  } catch (err) {
    res.status(404).send("error is occured" + err.message);
  }
});


userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedinUser = req.user;
    const hideUsersFromFeed = new Set();
    const page = parseInt(req.query.page)||1;
    const limit = parseInt(req.query.limit)||2;
    const skip = (page-1)*limit
    const connectionRequest = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedinUser._id }, { toUserId: loggedinUser._id }],
    });
    connectionRequest.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId);
      hideUsersFromFeed.add(req.toUserId);
    });
    console.log(hideUsersFromFeed);

    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedinUser._id } },
      ],
    }).select("firstName lastName password email").skip(skip).limit(limit)

    res.json({ msg: "its successfull", users });
  } catch (err) {
    res.status(404).send("error is occured" + err.message);
  }
});

module.exports = userRouter;
