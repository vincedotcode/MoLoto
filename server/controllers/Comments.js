import commentService from '../services/Comments.js';

const createComment = async (req, res) => {
    try {
        const comment = await commentService.createComment(req.body);
        res.status(201).json({ message: 'Comment created successfully', comment });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getCommentsByCarId = async (req, res) => {
    try {
        const comments = await commentService.getCommentsByCarId(req.params.carId);
        res.status(200).json(comments);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getCommentsByUserId = async (req, res) => {
    try {
        const comments = await commentService.getCommentsByUserId(req.params.userId);
        res.status(200).json(comments);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateComment = async (req, res) => {
    try {
        const comment = await commentService.updateComment(req.params.id, req.body);
        res.status(200).json({ message: 'Comment updated successfully', comment });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteComment = async (req, res) => {
    try {
        const comment = await commentService.deleteComment(req.params.id);
        res.status(200).json({ message: 'Comment deleted successfully', comment });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export default {
    createComment,
    getCommentsByCarId,
    getCommentsByUserId,
    updateComment,
    deleteComment
};
