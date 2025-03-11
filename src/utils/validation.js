const validator = require("validator")
const validateSignUpData = (req) =>{
    // Take Value from the user 
    // // object Destructing 
    const {firstName, lastName, emailId, password} = req.body; 
    if(!firstName || !lastName || !emailId || !password){
        throw new Error("All fields are required");
    }else if(!validator.isEmail(emailId)){
        throw new Error("Email is not valid");
    }else if(!validator.isStrongPassword(password)){
        throw new Error("Password is not strong enough");
    }
};

const validateLogInData = (req) => {
    const {emailId, password} = req.body;
    if( !emailId || !password){
        throw new Error("All fields are required");
    }else if(!validator.isEmail(emailId)){
        throw new Error("Email is not valid");
    }
}
module.exports = {
    validateSignUpData, validateLogInData
}

    // Validation of Data
   // if(!firstName || !lastName || !emailId || !password){
    //   throw new Error("All fields are required");
    // }else if(!validator.isEmail(emailId)){
    //   throw new Error("Email is not valid");
    // }else if(!validator.isStrongPassword(password)){
    //   throw new Error("Password is not strong enough");
    // }else if(firstName.length < 4 || lastName.length < 4){
    //   throw new Error("Name must be at least 4 characters");
    // }else if(password.length < 8){
    //   throw new Error("Password must be at least 8 characters");
    // }else if(firstName.length > 12 || lastName.length > 12){
    //   throw new Error("Name must be less than 12 characters");
    // }