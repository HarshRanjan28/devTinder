const mongoose = require('mongoose');
const {Schema} = mongoose;

const connectionRequestSchema = new Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enums: {
            values: ["ignore", "interested", "accepted", "rejected"],
            message: `{VALUE} is incorrect status type`
        }
    }
}, {
    timestamps: true
})

connectionRequestSchema.pre("save", function (next) {
    const connectionRequest = this;
    //Checking if sender and receiver are same user or not
    if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        throw new Error("Cannot send connection request to yourself!");
    }
    next();
})

const ConnectionRequest = new mongoose.model("ConnecttionRequest", connectionRequestSchema);

module.exports = ConnectionRequest