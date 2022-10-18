import mongoose from "mongoose";

const BookingsSchema = new mongoose.Schema({
    distance: {
        type: String,
        required: true, 
    },
    
    time: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    origin: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    }
});

// create user model
const BookingsModel = mongoose.model("Bookings", BookingsSchema);

export default BookingsModel;
