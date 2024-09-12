const mongoose = require("mongoose");

const ItemsSchema = new mongoose.Schema({
    title: String,
    createdAt: Date,
});

module.exports = mongoose.model("items", ItemsSchema);