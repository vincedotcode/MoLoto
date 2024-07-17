import wishlistService from '../services/Wishlist.js';

const addToWishlist = async (req, res) => {
    try {
        const wishlistItem = await wishlistService.addToWishlist(req.body);
        res.status(201).json({ message: 'Added to wishlist successfully', wishlistItem });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getWishlistsByUserId = async (req, res) => {
    try {
        const wishlists = await wishlistService.getWishlistsByUserId(req.params.userId);
        res.status(200).json(wishlists);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const removeFromWishlist = async (req, res) => {
    try {
        const wishlistItem = await wishlistService.removeFromWishlist(req.params.id);
        res.status(200).json({ message: 'Removed from wishlist successfully', wishlistItem });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export default {
    addToWishlist,
    getWishlistsByUserId,
    removeFromWishlist
};
