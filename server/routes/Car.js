import express from 'express';
import carController from '../controllers/Car.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Cars
 *   description: Car management endpoints
 */

/**
 * @swagger
 * /api/cars:
 *   post:
 *     tags: [Cars]
 *     summary: Add a new car
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Car'
 *     responses:
 *       201:
 *         description: Car added successfully
 *       400:
 *         description: Error message
 */
router.post('/', carController.addCar);

/**
 * @swagger
 * /api/cars/{id}:
 *   put:
 *     tags: [Cars]
 *     summary: Update an existing car
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Car ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Car'
 *     responses:
 *       200:
 *         description: Car updated successfully
 *       400:
 *         description: Error message
 */
router.put('/:id', carController.updateCar);

/**
 * @swagger
 * /api/cars/{id}:
 *   delete:
 *     tags: [Cars]
 *     summary: Delete a car
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Car ID
 *     responses:
 *       200:
 *         description: Car deleted successfully
 *       400:
 *         description: Error message
 */
router.delete('/:id', carController.deleteCar);

/**
 * @swagger
 * /api/cars:
 *   get:
 *     tags: [Cars]
 *     summary: Get all cars
 *     responses:
 *       200:
 *         description: A list of cars
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Car'
 *       400:
 *         description: Error message
 */
router.get('/', carController.getAllCars);

/**
 * @swagger
 * /api/cars/{id}:
 *   get:
 *     tags: [Cars]
 *     summary: Get a car by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Car ID
 *     responses:
 *       200:
 *         description: A car object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       400:
 *         description: Error message
 */
router.get('/:id', carController.getCarById);

/**
 * @swagger
 * /api/cars/seller/{sellerId}:
 *   get:
 *     tags: [Cars]
 *     summary: Get cars by seller ID
 *     parameters:
 *       - in: path
 *         name: sellerId
 *         schema:
 *           type: string
 *         required: true
 *         description: Seller ID
 *     responses:
 *       200:
 *         description: A list of cars
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Car'
 *       400:
 *         description: Error message
 */
router.get('/seller/:sellerId', carController.getCarsBySellerId);

/**
 * @swagger
 * /api/cars/buyer/{buyerId}:
 *   get:
 *     tags: [Cars]
 *     summary: Get cars by buyer ID
 *     parameters:
 *       - in: path
 *         name: buyerId
 *         schema:
 *           type: string
 *         required: true
 *         description: Buyer ID
 *     responses:
 *       200:
 *         description: A list of cars
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Car'
 *       400:
 *         description: Error message
 */
router.get('/buyer/:buyerId', carController.getCarsByBuyerId);

export default router;
