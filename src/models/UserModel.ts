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
        required: true
    },
    lastName: {
        type: String,
        default: "",
        required: true
    },
    dateOfBirth: {
        type: Date,
        default: "",
        required: true
    },
    phoneNumber: {
        type: String,
        default: "",
        required: true
    },
    gender: {
        type: String,
        enum: ["MALE", "FEMALE", "PREFER NOT TO SAY"],
        default: "",
        required: true
    }
}   
)

// create user model
const User = mongoose.model('User', UserSchema)

export default User