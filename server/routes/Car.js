const express = require('express');
const router = express.Router();
const carController = require('../controllers/Car');
const sellerOnly = require('../middlewares/seller');
const authenticateJWT = require('../middlewares/authenticateJWT')

/**
 * @swagger
 * components:
 *   schemas:
 *     Car:
 *       type: object
 *       required:
 *         - brand
 *         - model
 *         - year
 *         - price
 *         - motor
 *         - mileage
 *         - color
 *         - transmission
 *         - fuelType
 *         - condition
 *       properties:
 *         brand:
 *           type: string
 *         model:
 *           type: string
 *         year:
 *           type: integer
 *         price:
 *           type: number
 *         motor:
 *           type: string
 *         mileage:
 *           type: number
 *         color:
 *           type: string
 *         transmission:
 *           type: string
 *           enum: [manual, automatic, semi-automatic]
 *         fuelType:
 *           type: string
 *           enum: [petrol, diesel, electric, hybrid]
 *         condition:
 *           type: string
 *           enum: [new, used, certified pre-owned]
 *         description:
 *           type: string
 *         image:
 *           type: string
 *           format: byte
 *         features:
 *           type: array
 *           items:
 *             type: string
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 */

/**
 * @swagger
 * /api/cars/add:
 *   post:
 *     summary: Add a new car
 *     tags: [Cars]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Car'
 *     responses:
 *       201:
 *         description: Car successfully added
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       400:
 *         description: Error message
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *     security:
 *       - bearerAuth: []
 */
router.post('/add', authenticateJWT, sellerOnly, carController.addCar);


/**
 * @swagger
 * /api/cars/getall:
 *   get:
 *     summary: Get all cars
 *     tags: [Cars]
 *     responses:
 *       200:
 *         description: A list of cars
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Car'
 *       500:
 *         description: Error message
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/getall', authenticateJWT, carController.getAllCars);

module.exports = router;
