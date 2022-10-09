import mongoose from "mongoose"

// create user schema
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    confirmed: {
        type: Boolean,
        default: false,
    },
    verificationCode: {
        type: String,
        default: ""
    },
    firstName: {
        type: String,
        default: "",
    },
    lastName: {
        type: String,
        default: "",
    },
    dateOfBirth: {
        type: Date,
        default: "",
    },
    phoneNumber: {
        type: String,
        default: "",
    },
    gender: {
        type: String,
        enum: ["male", "female", "neutral"],
        default: "neutral",
    },
    profileUpdated: {
        type: Boolean,
        default: false
    }
}   
)

// create user model
const User = mongoose.model('User', UserSchema)

export default User