const { GoogleGenerativeAI } = require("@google/generative-ai");
const carService = require('./Car');

const genAI = new GoogleGenerativeAI("AIzaSyAwMaeHocAYMeUGqdbN72pNLIhVDixfltw");

async function getCarRecommendation(userQuery) {
    try {
        const cars = await carService.getAllCars();
        console.log(cars);
        const systemPrompt = "Based on the following cars in the inventory: " + cars + " - ";
        const fullPrompt = systemPrompt + userQuery;

        // Assuming getGenerativeModel and generateContent are the methods to set up the model and get the response
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        // Simulating an API call that returns a JSON response
        const completion = await model.generateContent(fullPrompt);
        // Simulate parsing the JSON response to extract data
        const aiResponseJSON = await completion.response.text(); // Assuming the response has a JSON body

        console.log("AI Response:", aiResponseJSON);

        // Returning both the prompt and the AI response.
        // The structure of aiResponseJSON depends on the actual response format from the AI service.
        return {
            prompt: userQuery,
            aiResponse: aiResponseJSON, // Assuming 'message' is a field in the JSON response
        };
    } catch (error) {
        console.error("Error in getCarRecommendation:", error);
        throw new Error('Failed to get recommendation from AI service');
    }
}

module.exports = { getCarRecommendation };
