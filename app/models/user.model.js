const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        uid: String,
        name: String,
        email: String,
        phone: String
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", userSchema);