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
        seat: {
            type: String,
            required: [false, "Please fill seat"],
          },
          waterBottle:{
            type: String,
            required: [false, "Please fill waterBottle"],
          },
          fuelType:{
            type: String,
            required: [false, "Please fill fuel type"],
          },
          ac:{
            type: String,
            required: [false, "Please fill AC"],
          },
          carrier:{
            type: String,
            required: [false, "Please fill carrier"],
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
}, { timestamps: true });

const OutStation = mongoose.model("OutStation", OutStationSchema);
module.exports = OutStation;
