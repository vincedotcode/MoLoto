import reviewService from '../services/Review.js';

const createReview = async (req, res) => {
    try {
        const review = await reviewService.createReview(req.body);
        res.status(201).json({ message: 'Review created successfully', review });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getReviewsByCarId = async (req, res) => {
    try {
        const reviews = await reviewService.getReviewsByCarId(req.params.carId);
        res.status(200).json(reviews);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getReviewsByUserId = async (req, res) => {
    try {
        const reviews = await reviewService.getReviewsByUserId(req.params.userId);
        res.status(200).json(reviews);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateReview = async (req, res) => {
    try {
        const review = await reviewService.updateReview(req.params.id, req.body);
        res.status(200).json({ message: 'Review updated successfully', review });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteReview = async (req, res) => {
    try {
        const review = await reviewService.deleteReview(req.params.id);
        res.status(200).json({ message: 'Review deleted successfully', review });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export default {
    createReview,
    getReviewsByCarId,
    getReviewsByUserId,
    updateReview,
    deleteReview
};
