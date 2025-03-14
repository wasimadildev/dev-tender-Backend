const express = require("express");
const { userAuth } = require("../middleware/auth");
const {
  validateProfileEdit,
  validateForgotPassword,
} = require("../utils/validation.js");
const bcrypt = require("bcrypt");
const profileRotuer = express.Router();

profileRotuer.get("/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(500).send("ERROR : " + error.message);
  }
});

profileRotuer.patch("/edit", userAuth, async (req, res) => {
  try {
    validateProfileEdit(req);

    const user = req.user;

    Object.keys(req.body).forEach((key) => (user[key] = req.body[key]));
    await user.save();

    res.send(`${user.firstName} your profile update successfuly...`);
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
});

profileRotuer.patch("/forgotPassword", userAuth, async (req, res) => {
  try {
    validateForgotPassword(req);

    const user = req.user;
    const { password: newPassword } = req.body;

    const isMatch = await bcrypt.compare(newPassword, user.password);
    if (isMatch) {
      throw new UnauthorizedError(
        "New password cannot be the same as the old password"
      );
    }

    user.password = await bcrypt.hash(newPassword, 10);

    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
});
module.exports = profileRotuer;
