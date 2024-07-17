import express from 'express';
import appointmentController from '../controllers/Appointment.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Appointments
 *   description: Appointment management endpoints
 */

/**
 * @swagger
 * /api/appointments:
 *   post:
 *     tags: [Appointments]
 *     summary: Create a new appointment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               buyer_id:
 *                 type: string
 *               seller_id:
 *                 type: string
 *               car_id:
 *                 type: string
 *               appointment_date:
 *                 type: string
 *                 format: date
 *               appointment_time:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [scheduled, completed, sold, cancelled]
 *     responses:
 *       201:
 *         description: Appointment created successfully
 *       400:
 *         description: Error message
 */
router.post('/', appointmentController.createAppointment);

/**
 * @swagger
 * /api/appointments/buyer/{buyerId}:
 *   get:
 *     tags: [Appointments]
 *     summary: Get appointments by buyer ID
 *     parameters:
 *       - in: path
 *         name: buyerId
 *         schema:
 *           type: string
 *         required: true
 *         description: Buyer ID
 *     responses:
 *       200:
 *         description: A list of appointments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Appointment'
 *       400:
 *         description: Error message
 */
router.get('/buyer/:buyerId', appointmentController.getAppointmentsByBuyerId);

/**
 * @swagger
 * /api/appointments/seller/{sellerId}:
 *   get:
 *     tags: [Appointments]
 *     summary: Get appointments by seller ID
 *     parameters:
 *       - in: path
 *         name: sellerId
 *         schema:
 *           type: string
 *         required: true
 *         description: Seller ID
 *     responses:
 *       200:
 *         description: A list of appointments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Appointment'
 *       400:
 *         description: Error message
 */
router.get('/seller/:sellerId', appointmentController.getAppointmentsBySellerId);

/**
 * @swagger
 * /api/appointments/{id}/status:
 *   put:
 *     tags: [Appointments]
 *     summary: Change appointment status
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Appointment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [scheduled, completed, sold, cancelled]
 *     responses:
 *       200:
 *         description: Appointment status updated successfully
 *       400:
 *         description: Error message
 */
router.put('/:id/status', appointmentController.changeAppointmentStatus);

export default router;
