const mongoose = require('mongoose');
const tripSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    addedDate: {
        type: Date,
        required: false,
    },
    updatedDate: {
        type: Date,
        required: false,
    },
}, { timestamps: true });
const Trip = mongoose.model("Trip", tripSchema);
module.exports = Trip;