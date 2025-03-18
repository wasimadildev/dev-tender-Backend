const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest.js");
const User = require("../models/user.js");

const requestRouter = express.Router();

requestRouter.post("/send/:status/:toUserId", userAuth, async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    const allowedStatus = ["ignored", "interested"];

    if (!allowedStatus.includes(status)) {
      throw new Error(`${status} is not allowed status`);
    }

    const toUser = await User.findById(toUserId);
    const fromUser = await User.findById(fromUserId);

    if (!toUser) {
      throw new Error("User not found");
    }
    const existingConnectionRequest = await ConnectionRequest.findOne({
      $or: [
        {
          fromUserId,
          toUserId,
        },
        { toUserId: fromUserId, fromUserId: toUserId },
      ],
    });

    if (existingConnectionRequest) {
      throw new Error("Connection Request Already Exists!!!!");
    }

    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });

    const data = await connectionRequest.save();

    res.json({
      message: `${toUser.firstName} is in ${status} to ${fromUser.firstName}`,
      data,
    });
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
});

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const status = req.params.status;
      const requestId = req.params.requestId;
      const loggedInUser = req.user;
      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        throw new Error("Status not allowed");
      }

      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });

      if (!connectionRequest) {
        throw new Error("Connection Request not found");
      }
      connectionRequest.status = status;
      const data = await connectionRequest.save();
      req.json({ message: "Connection Request " + status , data });
    } catch (error) {
      res.status(400).send("ERROR" + error.message);
    }
  }
);

module.exports = requestRouter;
