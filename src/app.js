const epxree = require("express");
const connectDB = require("./config/database.js");
const app = epxree();

const User = require("./models/user.js");

app.use(epxree.json());

// Add Data
app.post("/signup", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.send("Data Inset Successfully.... ");
  } catch (error) {
    res.status(500).send("Data cannot insert !!!", error.message);
  }
});

// Get Data Feed API - GET /feed  - get all user from the database

// GEt user by email
app.get("/user", async(req, res) =>{
  const email = req.body.emailId;
try {
 const user =  await User.find({emailId: email})
 if(user.length === 0 ){
  res.status(404).send("User cannot found")
 }else{
  res.send(user)
 }

} catch (error) {
  res.status(500).send("Something went wrong !!!!")
}
  
})

// GET all user Feed API

app.get("/feed", async(req, res) =>{
  try {
    const users = await User.find()
    if(users === 0){
      es.status(404).send("User cannot found")
    }else{
      res.send(users)
    }
  } catch (error) {
    res.status(500).send("Something went wrong !!!!")
  }
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
