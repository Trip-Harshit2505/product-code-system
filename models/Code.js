const mongoose = require('mongoose');

const codeSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to Product model
        ref: 'Product',
        required: true
    },
    batchNumber: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Code', codeSchema);

// This code defines a Mongoose schema for a Code model with fields for product ID, batch number, unique code, and creation date.

// The productId field references the Product model, allowing for a relationship between codes and products.