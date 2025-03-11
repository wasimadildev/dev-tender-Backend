const epxree = require("express");
const connectDB = require("./config/database.js");
const validator = require("validator");
const {
  validateSignUpData,
  validateLogInData,
} = require("./utils/validation.js");
const bcrypt = require("bcrypt");
const app = epxree();

const User = require("./models/user.js");

app.use(epxree.json());

// Add Data
app.post("/signup", async (req, res) => {
  try {
    // Validation of data is Required
    validateSignUpData(req);
    // Extract Data from API
    const { firstName, lastName, password, emailId } = req.body;

    // Encrypt the password and then Store into database
    const passwordHash = await bcrypt.hash(password, 10);
    // Store user in database

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

// Get Data Feed API - GET /feed  - get all user from the database

// Login

app.post("/login", async (req, res) => {
  try {
    // Validation of Data is Required
    validateLogInData(req);
    // Extract Data from API
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId }).select("+password");
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password." });
    }
    // Load hash from your password DB.
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials." });
    }
    res.send("Login Succesfully.... ")
  } catch (error) {
    res
      .status(500)
      .json({ error: "Data cannot insert !!!", message: error.message });
  }
});

// GEt user by email
app.get("/user", async (req, res) => {
  const email = req.body.emailId;
  try {
    const user = await User.find({ emailId: email });
    if (user.length === 0) {
      res.status(404).send("User cannot found");
    } else {
      res.send(user);
    }
  } catch (error) {
    res.status(500).send("Something went wrong !!!!");
  }
});

// GET all user Feed API

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find();
    if (users === 0) {
      res.status(404).send("User cannot found");
    } else {
      res.send(users);
    }
  } catch (error) {
    res.status(500).send("Something went wrong !!!!");
  }
});

// Delete User by ID

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;

  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("User Deleted successfully ");
  } catch (error) {
    res.status(500).send("Something went wrong !!!!");
  }
});

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  const data = req.body;

  try {
    const allowedUpdates = ["photoUrl", "about", "gender", "age", "skills"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      allowedUpdates.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed.");
    }

    const user = await User.findByIdAndUpdate(userId, data, {
      runValidators: true,
    });
    res.send("Data Update Successfully ....");
  } catch (error) {
    res.status(500).json({ error: "Update failed!!!", message: error.message });
  }
});
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
