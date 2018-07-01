const mongoose = require("mongoose");

const hotelSchema = mongoose.Schema(
    {
        uid: String,
        name: String,
        email: String,
        phone: String,
        latitude: Number,
        longitude: Number
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Hotel", hotelSchema);