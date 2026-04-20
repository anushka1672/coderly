const mongoose = require("mongoose");
const User = require("./user");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    fromUserName: {
      type: String,
      required: true,
    },
    toUserName: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["interested", "accepted", "ignored", "rejected"],
        message: "{VALUE} is not supported",
      },
    },
  },
  { timestamps: true },
);

module.exports = new mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema,
);
