const epxree = require("express");
const connectDB = require("./config/database.js");
const validator = require("validator");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middleware/auth.js");
const {
  validateSignUpData,
  validateLogInData,
} = require("./utils/validation.js");
const bcrypt = require("bcrypt");
const app = epxree();

const User = require("./models/user.js");

app.use(epxree.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
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

app.post("/login", async (req, res) => {
  try {
    validateLogInData(req);

    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password." });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials." });
    }

    const token = await jwt.sign({ _id: user._id }, "My-Secret-key", {
      expiresIn: "1d",});
    console.log(token);

    res.cookie("token", token, {expires: new Date(Date.now() + 900000), httpOnly: true}, );
    res.send("Login Succesfully.... ");
  } catch (error) {
    res
      .status(500)
      .json({ error: "Data cannot insert !!!", message: error.message });
  }
});

app.post("/sendConnectionRequest", userAuth, async(req,res) =>{
  const user =req.user;


  console.log("Sending  a connection request");

res.send(user.firstName + " Sent the connection request")

})


connectDB()
  .then(() => {
    console.log("MongoDB Connection Established Successfully ..");
    app.listen(3000, () => {
      console.log("Server is listen on PORT 3000!!!");
    });
  })
  .catch((error) => {
    console.error("Database cannot be extablished !!!!");
  });
