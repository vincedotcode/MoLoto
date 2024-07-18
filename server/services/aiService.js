import OpenAI from 'openai';
import { getCarById, getCarsBySellerId, getAllCars } from './Car.js';
import authService from './Auth.js'; // Updated import


const openAI = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function getCarSalesAI(context, userId) {
  const initialContext = [
    {
      role: 'system',
      content: 'You are a car sales assistant helping users find the best cars, contact sellers. User ID will always be provided as user_id. Return the currencies in Mauritian Rupees (Rs)'
    },
    {
      role: 'user',
      content: `User ID: ${userId}`
    },
    ...context
  ];

  const response = await callOpenAIWithTools(initialContext, userId);
  return response;
}

async function callOpenAIWithTools(context, userId) {
  const response = await openAI.chat.completions.create({
    model: 'gpt-4',
    messages: context,
    functions: [
      {
        name: 'getCarById',
        description: 'Fetch a car by its ID',
        parameters: {
          type: 'object',
          properties: {
            carId: { type: 'string', description: 'Car ID' }
          },
          required: ['carId']
        }
      },
      {
        name: 'getCarsBySellerId',
        description: 'Fetch cars by seller ID',
        parameters: {
          type: 'object',
          properties: {
            sellerId: { type: 'string', description: 'Seller ID' }
          },
          required: ['sellerId']
        }
      },
      {
        name: 'getAllCars',
        description: 'Fetch all available cars',
        parameters: {}
      },
      {
        name: 'getSellerDetails',
        description: 'Fetch seller details by user ID',
        parameters: {
          type: 'object',
          properties: {
            sellerId: { type: 'string', description: 'Seller ID' }
          },
          required: ['sellerId']
        }
      }
    ]
  });

  const willInvokeFunction = response.choices[0].finish_reason === 'function_call';
  const functionCall = response.choices[0].message.function_call;

  if (willInvokeFunction && functionCall) {
    const { name, arguments: rawArguments } = functionCall;
    const parsedArguments = JSON.parse(rawArguments);

    if (name === 'getCarById') {
      const car = await getCarById(parsedArguments.carId);
      const toolResponse = `Here is the car:\n${JSON.stringify(car, null, 2)}`;

      context.push(response.choices[0].message);
      context.push({
        role: 'function',
        name: 'getCarById',
        content: toolResponse
      });

    } else if (name === 'getCarsBySellerId') {
      const cars = await getCarsBySellerId(parsedArguments.sellerId);
      const toolResponse = `Here are the cars:\n${JSON.stringify(cars, null, 2)}`;

      context.push(response.choices[0].message);
      context.push({
        role: 'function',
        name: 'getCarsBySellerId',
        content: toolResponse
      });

    } else if (name === 'getAllCars') {
      const cars = await getAllCars();
      const toolResponse = `Here are all available cars:\n${JSON.stringify(cars, null, 2)}`;

      context.push(response.choices[0].message);
      context.push({
        role: 'function',
        name: 'getAllCars',
        content: toolResponse
      });

    } else if (name === 'getSellerDetails') {
      const seller = await authService.getUserById(parsedArguments.sellerId);
      const toolResponse = `Here are the seller details:\n${JSON.stringify(seller, null, 2)}`;

      context.push(response.choices[0].message);
      context.push({
        role: 'function',
        name: 'getSellerDetails',
        content: toolResponse
      });

    }
  }

  const secondResponse = await openAI.chat.completions.create({
    model: 'gpt-4',
    messages: context
  });

  return secondResponse.choices[0].message;
}

export {
  getCarSalesAI
};
