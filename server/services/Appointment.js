import Appointment from '../models/Appointment.js';
import Car from '../models/Car.js';
import Wishlist from '../models/Wishlist.js';
import Notification from '../models/Notification.js';
import mongoose from 'mongoose';

// Create a new appointment
const createAppointment = async (appointmentData) => {
    const appointment = new Appointment(appointmentData);
    await appointment.save();
    return appointment;
};

// Get appointments by buyer ID
const getAppointmentsByBuyerId = async (buyerId) => {
    const appointments = await Appointment.find({ buyer_id: buyerId })
        .populate('car_id', 'make model year')
        .populate('seller_id', 'name address email phone_number')
        .populate('buyer_id', 'name address email phone_number');
    return appointments;
};

// Get appointments by seller ID
const getAppointmentsBySellerId = async (sellerId) => {
    const appointments = await Appointment.find({ seller_id: sellerId })
        .populate('car_id', 'make model year')
        .populate('seller_id', 'name address email phone_number')
        .populate('buyer_id', 'name address email phone_number');
    return appointments;
};

// Change appointment status
const changeAppointmentStatus = async (appointmentId, status) => {
    const appointment = await Appointment.findByIdAndUpdate(appointmentId, { status }, { new: true })
        .populate('car_id', 'make model year')
        .populate('seller_id', 'name address email phone_number')
        .populate('buyer_id', 'name address email phone_number');
    if (!appointment) {
        throw new Error('Appointment not found');
    }

    if (status === 'sold') {
        // Update car status
        const car = await Car.findByIdAndUpdate(appointment.car_id, { status: 'sold', is_sold: true, buyer_id: appointment.buyer_id }, { new: true });
        if (!car) {
            throw new Error('Car not found');
        }

        // Notify users with the car in their wishlist
        const wishlists = await Wishlist.find({ car_id: car._id });
        const notifications = wishlists.map(wishlist => ({
            user_id: wishlist.user_id,
            message: `The car ${car.make} ${car.model} has been sold.`,
            notification_type: 'car_sold',
            sent_at: new Date(),
            link: `/cars/${car._id}`
        }));
        await Notification.insertMany(notifications);
    }

    return appointment;
};

export default {
    createAppointment,
    getAppointmentsByBuyerId,
    getAppointmentsBySellerId,
    changeAppointmentStatus
};
