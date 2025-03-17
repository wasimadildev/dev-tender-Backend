const mongoose = require("mongoose");


const connectinRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true

    },
    status:{
        type: String,
        enum: {
            values: ["ignored", "interested", "accepted", "rejected"],
            message :` {VALAUE} is not corrected status type `
        },
        required: true

    }

}, {timestamps: true});


connectinRequestSchema.pre("save", function(next){
const connectinRequest = this;
if(connectinRequest.fromUserId.equals(connectinRequest.toUserId)){
    throw new Error("You cannot send connection request to yourself")
}
next();
})
const connectinRequestModel = new mongoose.model("ConnectionRequest", connectinRequestSchema)


connectionRequestSchema.index({ formUserId: 1 });


userSchema.index({ email: 1, age: -1 });


module.exports = connectinRequestModel;