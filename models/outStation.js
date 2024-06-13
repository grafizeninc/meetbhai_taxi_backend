const mongoose = require("mongoose");

const OutStationSchema = new mongoose.Schema({
    stateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "State",
        required: [true, "Please fill State"],
    },
    pricesPerKm: [{
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Vehicle",
            required: [true, "Please fill Vehicle Category"],
        },
        price: {
            type: String,
            required: [true, "Please fill price"],
        },
    }],
    addedDate: {
        type: Date,
        required: false,
    },
    updatedDate: {
        type: Date,
        required: false,
    },
});

const OutStation = mongoose.model("OutStation", OutStationSchema);
module.exports = OutStation;
