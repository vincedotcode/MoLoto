// models/Car.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carSchema = new Schema({
    brand: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    motor: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    image: {
        type: String, 
    },
    mileage: {
        type: Number,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    transmission: {
        type: String,
        enum: ['manual', 'automatic', 'semi-automatic'],
        required: true,
    },
    fuelType: {
        type: String,
        enum: ['petrol', 'diesel', 'electric', 'hybrid'],
        required: true,
    },
    condition: {
        type: String,
        enum: ['new', 'used', 'certified pre-owned'],
        required: true,
    },
    features: [{
        type: String,
    }],
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    buyer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false, 
    }
}, { timestamps: true });

module.exports = mongoose.model('Car', carSchema);
