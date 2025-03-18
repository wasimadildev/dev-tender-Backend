const express = require("express");
const connectDB = require("./config/database.js");
const cookieParser = require("cookie-parser");



const app = express();


app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth.js")
const profileRouter = require("./routes/profile.js")
const requestRouter = require("./routes/request.js")



app.use("/auth", authRouter);
app.use("/profile", profileRouter)
app.use("/request", requestRouter)


connectDB()
  .then(() => {
    console.log("MongoDB Connection Established Successfully ..");
    app.listen(3000, () => {
      console.log("Server is listen on PORT 3000!!!");
    });
  })
  .catch((error) => {
    console.error("Database cannot be established !!!!");
  });
