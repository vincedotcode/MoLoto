import Wishlist from '../models/Wishlist.js';

// Add to wishlist
const addToWishlist = async (wishlistData) => {
    const wishlistItem = new Wishlist(wishlistData);
    await wishlistItem.save();
    return wishlistItem;
};

// Get wishlist items by user ID
const getWishlistsByUserId = async (userId) => {
    const wishlists = await Wishlist.find({ user_id: userId }).populate('car_id', 'make model year price');
    return wishlists;
};

// Remove from wishlist
const removeFromWishlist = async (wishlistId) => {
    const wishlistItem = await Wishlist.findByIdAndDelete(wishlistId);
    if (!wishlistItem) {
        throw new Error('Wishlist item not found');
    }
    return wishlistItem;
};

export default {
    addToWishlist,
    getWishlistsByUserId,
    removeFromWishlist
};
