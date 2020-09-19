const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const productSchema = new mongoose.Schema({
    name: {
        required: true,
        trim: true,
        maxlength: 32,
        type: String,
    },
    description: {
        required: true,
        trim: true,
        maxlength: 1500,
        type: String,
    },
    price: {
        type: Number,
        required: true,
        maxlength: 32,
        trim: true,
    },
    category: {
        type: ObjectId,
        ref: "Category",
        required: true,
    },
    stock: {
        type: Number,
    },
    sold: {
        type: Number,
        default: 0,
    },
    photo: {
        data: Buffer,
        contentType: String,
    }
}, {timestamps: true});

module.exports = mongoose.model("Product", productSchema); // M