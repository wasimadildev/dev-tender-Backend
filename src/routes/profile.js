const express = require("express");
const { userAuth } = require("../middleware/auth");

const profileRotuer = express.Router();

profileRotuer.get("/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(500).send("ERROR : " + error.message);
  }
});


module.exports = profileRotuer;