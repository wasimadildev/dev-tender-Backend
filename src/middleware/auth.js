const jwt = require("jsonwebtoken");
const User = require("../models/user.js");
const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    const decodedMessage = await jwt.verify(token, "My-Secret-key");
    if (!token) {
      throw new Error("Token is not valid!!!!");
    }

    const { _id } = decodedMessage;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(404).send({ Error: error.message });
  }
};

module.exports = {
  userAuth,
};

