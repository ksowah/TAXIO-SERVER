import mongoose from "mongoose";

const RideHistorySchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    
    lat: {
        type: String,
        required: true
    },
    lng: {
        type: String,
        required: true
    },
    user: {
        type: String,
        ref: "User",
        required: true
    }
});

// create user model
const RideHistoryModel = mongoose.model("RideHistory", RideHistorySchema);

export default RideHistoryModel;
