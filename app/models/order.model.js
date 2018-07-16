const mongoose = require("mongoose");
const User = require("./user.model.js");
const Food = require("./food.model.js");

const orderSchema = mongoose.Schema(
    {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
        user: { type: User.schema, required: true },
        foodList: { type: [Food.schema], required: true }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Order", orderSchema);