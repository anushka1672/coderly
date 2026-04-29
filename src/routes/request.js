const express = require("express");
const { userAuth } = require("../middlewares/auth");
const requestRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatus = ["interested", "ignored"];
      if (!allowedStatus.includes(status)) {
        return res.send("status is not valid");
      }

      const toUser = await User.findById(toUserId);

      if (!toUser) {
        return res.send("sender id dosent exist");
      }

      const requestExist = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (requestExist) {
        return res.send("cannot send request again");
      }

      if (fromUserId.equals(toUserId)) {
        return res.send("cannot send request to yourself");
      }

      const connectionRequest = ConnectionRequest({
        fromUserId,
        toUserId,
        fromUserName: req.user.firstName,
        toUserName: toUser.firstName,
        status,
      });

      const data = await connectionRequest.save();
      res.json({
        msg: req.user.firstName + "is sending request to" + toUser.firstName,
        data,
      });
      res.send("connectionRequest is succesfully send");
    } catch (err) {
      res.status(404).send("error is occured" + err.message);
    }
  },
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const { status, requestId } = req.params;
      const loggedinUser = req.user;
      console.log("hello ji", req.user);

      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        return res.send("status is not valid");
      }

      const requestIdExist = await ConnectionRequest.findById(requestId);

      if (!requestIdExist) {
        return res.send("sender id dosent exist");
      }

      const update = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedinUser._id,
        status: "interested",
      });

      if (!update) {
        return res.send("sender id dosent exist");
      }

      update.status = status;

      const data = await update.save();

      res.json({ msg: "review done successfully", data });
    } catch (err) {
      res.status(404).send("error is occured" + err.message);
    }
    
  },
);

module.exports = requestRouter;
