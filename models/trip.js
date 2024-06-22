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
});
const Trip = mongoose.model("Trip", tripSchema);
module.exports = Trip;