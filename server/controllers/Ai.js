const { getCarRecommendation } = require('../services/Ai');

const AIAgent = {
    getRecommendation: async (req, res) => {
        try {
            const userQuery = req.body.query;
            if (!userQuery) {
                return res.status(400).json({ message: "Query is required." });
            }
            const result = await getCarRecommendation(userQuery);
            res.json(result);
        } catch (error) {
            console.error("Error in getRecommendation:", error);
            res.status(500).json({ message: "Failed to get car recommendations." });
        }
    }
};

module.exports = AIAgent;
