import Review from '../models/Review.js';

// Create a new review
const createReview = async (reviewData) => {
    const review = new Review(reviewData);
    await review.save();
    return review;
};

// Get reviews by car ID
const getReviewsByCarId = async (carId) => {
    const reviews = await Review.find({ car_id: carId })
        .populate('user_id', 'name email');
    return reviews;
};

// Get reviews by user ID
const getReviewsByUserId = async (userId) => {
    const reviews = await Review.find({ user_id: userId })
        .populate('car_id', 'make model year');
    return reviews;
};

// Update a review
const updateReview = async (reviewId, updateData) => {
    const review = await Review.findByIdAndUpdate(reviewId, updateData, { new: true });
    if (!review) {
        throw new Error('Review not found');
    }
    return review;
};

// Delete a review
const deleteReview = async (reviewId) => {
    const review = await Review.findByIdAndDelete(reviewId);
    if (!review) {
        throw new Error('Review not found');
    }
    return review;
};

export default {
    createReview,
    getReviewsByCarId,
    getReviewsByUserId,
    updateReview,
    deleteReview
};
