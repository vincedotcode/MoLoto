import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    car_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car',
        required: true,
    }
}, { timestamps: true });

export default mongoose.model('Wishlist', wishlistSchema);
