import { getCarSalesAI } from "../services/aiService.js";

const carAiController = async (req, res) => {
  try {
    let context = [
      {
        role: 'system',
        content: 'You are a car sales assistant helping users find the best cars, contact sellers.'
      }
    ];

    const userMessage = req.body.message;
    const userId = req.body.userId;
    context.push({
      role: 'user',
      content: userMessage
    });

    let aiResponse = await getCarSalesAI(context, userId);
    context.push(aiResponse);

    // Keep interacting until a final answer is provided
    while (true) {
      const userNextMessage = req.body.message;
      context.push({
        role: 'user',
        content: userNextMessage
      });

      aiResponse = await getCarSalesAI(context, userId);
      context.push(aiResponse);

      if (aiResponse.finish_reason !== 'tool_calls') {
        break;
      }
    }

    res.json({ response: aiResponse.content });
  } catch (error) {
    res.status(500).json({ error: error.message || 'An error occurred during the chat interaction.' });
  }
};

export {
  carAiController
};
