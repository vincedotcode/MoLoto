import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
    seller_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    buyer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    make: {
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
    mileage: {
        type: Number,
        required: true,
    },
    engine_type: {
        type: String,
        required: true,
    },
    fuel_efficiency: {
        type: Number,
        required: true,
    },
    transmission_type: {
        type: String,
        enum: ['automatic', 'manual', 'semi-automatic'],
        required: true,
    },
    fuel_type: {
        type: String,
        enum: ['petrol', 'diesel', 'electric', 'hybrid'],
        required: true,
    },
    has_never_been_in_accident: {
        type: Boolean,
        required: true,
    },
    insurance_number: {
        type: String,
        required: true,
        unique: true,
    },
    car_number: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
    },
    image_urls: {
        type: [String],
        required: true,
    },
    is_sold: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        enum: ['available', 'sold'],
        required: true,
    },
    car_type: {
        type: String,
        enum: ['sedan', 'hatchback', 'SUV', 'coupé', 'convertible', 'wagon', 'pickup', 'minivan', 'sports car', 'electric', 'hybrid', 'luxury', 'off-road', 'other'],
        required: true,
    }
}, { timestamps: true });

export default mongoose.model('Car', carSchema);
