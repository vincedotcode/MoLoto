import appointmentService from '../services/Appointment.js';

const createAppointment = async (req, res) => {
    try {
        const appointment = await appointmentService.createAppointment(req.body);
        res.status(201).json({ message: 'Appointment created successfully', appointment });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAppointmentsByBuyerId = async (req, res) => {
    try {
        const appointments = await appointmentService.getAppointmentsByBuyerId(req.params.buyerId);
        res.status(200).json(appointments);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAppointmentsBySellerId = async (req, res) => {
    try {
        const appointments = await appointmentService.getAppointmentsBySellerId(req.params.sellerId);
        res.status(200).json(appointments);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const changeAppointmentStatus = async (req, res) => {
    try {
        const appointment = await appointmentService.changeAppointmentStatus(req.params.id, req.body.status);
        res.status(200).json({ message: 'Appointment status updated successfully', appointment });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export default {
    createAppointment,
    getAppointmentsByBuyerId,
    getAppointmentsBySellerId,
    changeAppointmentStatus
};
