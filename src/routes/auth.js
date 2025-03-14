const express = require("express");
const {validateSignUpData , validateLogInData } = require("../utils/validation.js")
const bcrypt = require("bcrypt")
const User = require("../models/user.js")
const authRouter = express.Router();


authRouter.post("/signup", async (req, res) => {
    try {
      validateSignUpData(req);
  
      const { firstName, lastName, password, emailId } = req.body;
  
      const passwordHash = await bcrypt.hash(password, 10);
  
      const user = new User({
        firstName,
        lastName,
        emailId,
        password: passwordHash,
      });
  
      await user.save();
      res.send("Data Inset Successfully.... ");
    } catch (error) {
      res
        .status(500)
        .json({ error: "Data cannot insert !!!", message: error.message });
    }
  });


  
authRouter.post("/login", async (req, res) => {
    try {
      validateLogInData(req);
  
      const { emailId, password } = req.body;
  
      const user = await User.findOne({ emailId });
      if (!user) {
        return res.status(400).json({ error: "Invalid email or password." });
      }
      const isMatch = await user.verifyPassword(password);
  
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid credentials." });
      }
  
      const token = await user.getJWT();
  
      res.cookie("token", token, {
        expires: new Date(Date.now() + 900000),
        httpOnly: true,
      });
      res.send("Login Succesfully.... ");
    } catch (error) {
      res
        .status(500)
        .json({ error: "Data cannot insert !!!", message: error.message });
    }
  });

  

module.exports = authRouter