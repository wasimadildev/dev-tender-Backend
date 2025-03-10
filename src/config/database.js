const mongoose = require("mongoose");




const connectDB = async() =>{
    await mongoose.connect("mongodb+srv://WasimAdil:WasimAdil@cluster0.7mulf.mongodb.net/devTinder")
}


module.exports = connectDB