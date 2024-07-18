import express from 'express';
import wishlistController from '../controllers/Wishlist.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Wishlist
 *   description: Wishlist management endpoints
 */

/**
 * @swagger
 * /api/wishlist:
 *   post:
 *     tags: [Wishlist]
 *     summary: Add to wishlist
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *               car_id:
 *                 type: string
 *     responses:
 *       201:
 *         description: Added to wishlist successfully
 *       400:
 *         description: Error message
 */
router.post('/', wishlistController.addToWishlist);

/**
 * @swagger
 * /api/wishlist/user/{userId}:
 *   get:
 *     tags: [Wishlist]
 *     summary: Get wishlist items by user ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: A list of wishlist items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Wishlist'
 *       400:
 *         description: Error message
 */
router.get('/user/:userId', wishlistController.getWishlistsByUserId);

/**
 * @swagger
 * /api/wishlist/{id}:
 *   delete:
 *     tags: [Wishlist]
 *     summary: Remove from wishlist
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Wishlist item ID
 *     responses:
 *       200:
 *         description: Removed from wishlist successfully
 *       400:
 *         description: Error message
 */
router.delete('/:id', wishlistController.removeFromWishlist);

export default router;
