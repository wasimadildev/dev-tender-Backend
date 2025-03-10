const epxree = require("express");
const connectDB = require("./config/database.js");
const app = epxree();

const User = require("./models/user.js")

app.use(epxree.json());

app.post("/signup", async(req,res) =>{
  

    const user = new User(req.body)
    
    try {
        await user.save();
        res.send("Data Inset Successfully.... ")
    } catch (error) {
        res.status(500).send("Data cannot insert !!!" , error.message)
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
