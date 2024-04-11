const express = require('express');
const router = express.Router();
const openAICarAgentController = require('../controllers/Ai');

/**
 * @swagger
 * /api/ai/recommend:
 *   post:
 *     summary: Get car recommendations
 *     description: Receives a user query and returns car recommendations based on OpenAI's response.
 *     tags: [Car Recommendation]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               query:
 *                 type: string
 *                 description: The user's query asking for car recommendations.
 *                 example: "I'm looking for a family car with good safety ratings."
 *     responses:
 *       200:
 *         description: Successfully fetched car recommendations
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 aiResponse:
 *                   type: string
 *                   description: The AI's response to the user query.
 *                 bestCar:
 *                   type: object
 *                   $ref: '#/components/schemas/Car'
 *                   description: The best car match based on the AI's response.
 *       400:
 *         description: Bad request, query is missing
 *       500:
 *         description: Server error
 */
router.post('/recommend', openAICarAgentController.getRecommendation);

module.exports = router;
