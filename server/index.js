const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const authRoutes = require('./routes/Auth');
const carRoutes = require('./routes/Car');
const aiRoutes = require('./routes/Ai')
const config = require('./config');
const authenticateJWT = require('./middlewares/authenticateJWT');

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
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [{
            bearerAuth: [],
        }],
    },
    apis: ['./routes/*.js'],
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use(express.json());
// Apply globally with exceptions
app.use((req, res, next) => {
    if (req.path.startsWith('/api-docs') || req.path.startsWith('/api/auth')) {
        return next();
    }
    authenticateJWT(req, res, next);
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/ai', aiRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
