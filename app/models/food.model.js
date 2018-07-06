const mongoose = require("mongoose");
const Hotel = require("./hotel.model.js");

const foodSchema = mongoose.Schema(
    {
        name: { type: String, required: true, text: true },
        cost: { type: Number, required: true },
        image: { type: String, required: false, default: "" },
        category: { type: String, required: true },
        hotel: { type: Hotel.schema, required: true }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Food", foodSchema);