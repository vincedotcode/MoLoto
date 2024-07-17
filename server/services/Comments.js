import Comment from '../models/Comment.js';

// Create a new comment
const createComment = async (commentData) => {
    const comment = new Comment(commentData);
    await comment.save();
    return comment;
};

// Get comments by car ID
const getCommentsByCarId = async (carId) => {
    const comments = await Comment.find({ car_id: carId })
        .populate('user_id', 'name email');
    return comments;
};

// Get comments by user ID
const getCommentsByUserId = async (userId) => {
    const comments = await Comment.find({ user_id: userId })
        .populate('car_id', 'make model year');
    return comments;
};

// Update a comment
const updateComment = async (commentId, updateData) => {
    const comment = await Comment.findByIdAndUpdate(commentId, updateData, { new: true });
    if (!comment) {
        throw new Error('Comment not found');
    }
    return comment;
};

// Delete a comment
const deleteComment = async (commentId) => {
    const comment = await Comment.findByIdAndDelete(commentId);
    if (!comment) {
        throw new Error('Comment not found');
    }
    return comment;
};

export default {
    createComment,
    getCommentsByCarId,
    getCommentsByUserId,
    updateComment,
    deleteComment
};
