import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    car_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car',
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    is_public: {
        type: Boolean,
        default: true,
    }
}, { timestamps: true });

export default mongoose.model('Comment', commentSchema);
