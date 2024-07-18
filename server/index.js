import express from 'express';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import cors from 'cors';
import authRoutes from './routes/Auth.js';
import carRoutes from './routes/Car.js';
import appointmentRoutes from './routes/Appointment.js';
import imageRoutes from './routes/Image.js';
import wishlistRoutes from './routes/Wishlist.js';
import commentRoutes from './routes/Comments.js';
import reviewRoutes from './routes/Review.js';
import carAiRoutes from './routes/carAiRoutes.js'; // Import car AI routes
import config from './config/index.js';
import swaggerSchemas from './swagger/schema.js';

const app = express();

mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Car Marketplace API',
            version: '1.0.0',
            description: 'API Documentation for the Car Marketplace application',
        },
        components: {
            schemas: {
                Car: swaggerSchemas.carSchema,
                Wishlist: swaggerSchemas.wishlistSchema,
                Comment: {
                    type: 'object',
                    properties: {
                        user_id: { type: 'string' },
                        car_id: { type: 'string' },
                        comment: { type: 'string' },
                        is_public: { type: 'boolean' },
                    },
                },
                Review: {
                    type: 'object',
                    properties: {
                        user_id: { type: 'string' },
                        car_id: { type: 'string' },
                        rating: { type: 'number' },
                        review: { type: 'string' },
                    },
                },
            },
        },
    },
    apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use(cors()); // Enable CORS for all routes

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/image', imageRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/car-ai', carAiRoutes); // Add car AI routes

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
