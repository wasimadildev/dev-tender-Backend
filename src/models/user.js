const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const validator = require("validator")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 12,

  },
  lastName: {
    type: String,
    minLength: 4,
    maxLength: 12,

  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate(value){
        if(!validator.isEmail(value)){
            throw new Error("Email is not valid");
        }
    }
  },
  password: {
    type: String,
    required: true,
    minLength: 8,

  },
  age: {
    type: Number,
    min: 18,
    max: 100

  },
  gender: {
    type: String,
    validate(value){
        if(!["male","female", "other"].includes(value)){
            throw new Error("Gender data is not valid");
        }
    }
  },
  photoUrl: {
    type: String,
    default: "https://www.pnrao.com/wp-content/uploads/2023/06/dummy-user-male.jpg"
  },
  about: {
    type: String,
    default: "This is a defaults about of the user "
  },
  skills: {
    type: [String],
  },
}, {timestamps: true});

userSchema.methods.getJWT = async function(){
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "My-Secret-key", {
    expiresIn: "1d",});
    return token
}
userSchema.methods.verifyPassword = async function(password){
  const user = this;
  const isMatch = await bcrypt.compare(password, user.password);
  return isMatch
}




const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
