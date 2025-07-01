const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    batchSize: {
        type: Number,
        required: true,
    },
    mrp: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Product', productSchema);

// This code defines a Mongoose schema for a Product model with fields for name, batch size, MRP, image, and creation date.