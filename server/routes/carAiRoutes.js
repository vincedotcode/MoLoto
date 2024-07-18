import express from 'express';
import { carAiController } from '../controllers/carAiController.js';

const router = express.Router();

/**
 * @swagger
 * /api/car-ai:
 *   post:
 *     summary: Interact with the AI car sales assistant
 *     tags: [AI]
 *     description: This endpoint allows users to interact with the AI car sales assistant.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: User ID
 *               message:
 *                 type: string
 *                 description: User's message to the AI
 *     responses:
 *       200:
 *         description: AI response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   description: AI's response
 *       500:
 *         description: Internal server error
 */
router.post('/', carAiController);

export default router;
