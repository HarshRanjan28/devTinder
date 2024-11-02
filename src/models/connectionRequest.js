const mongoose = require("mongoose");

const {Schema} = mongoose;

const connectionRequest = new Schema(
    {
        fromUserId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        toUserId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        status: {
            type: String,
            required: true,
            enum: {
                type: String,
                values: ["ignore", "interested", "accepted", "rejected"],
                message: `{VALUE} is incorrect status type`,
            },
        },
    },
    {
        timestamps: true,
    }
);

connectionRequest.pre("save", function (next) {
    const connectionRequest = this;
    if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        throw new Error("Cannot send the connection request to Yourself");
    }
    next();
})

const connectionRequestModel = new mongoose.model(
    "ConnectionRequest",
    connectionRequest
);

module.exports = connectionRequestModel;
