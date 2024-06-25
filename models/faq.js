const mongoose = require('mongoose');
const faqSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Please fill question"],
    },
    answer: {
        type: String,
        required: [true, "Please fill answer"],
    },
    order: {
        type: Number,
        unique: true,
    },
    active: {
        type: Boolean,
        default: true,
    },
    addedDate: {
        type: Date,
        required: false,
    },
    updatedDate: {
        type: Date,
        required: false,
    },
});
const FAQ = mongoose.model("FAQ", faqSchema);
module.exports = FAQ;