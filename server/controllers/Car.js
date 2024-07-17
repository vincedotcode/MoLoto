import carService from '../services/Car.js';

const addCar = async (req, res) => {
    try {
        const car = await carService.addCar(req.body);
        res.status(201).json({ message: 'Car added successfully', car });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateCar = async (req, res) => {
    try {
        const car = await carService.updateCar(req.params.id, req.body);
        res.status(200).json({ message: 'Car updated successfully', car });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteCar = async (req, res) => {
    try {
        const car = await carService.deleteCar(req.params.id);
        res.status(200).json({ message: 'Car deleted successfully', car });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllCars = async (req, res) => {
    try {
        const cars = await carService.getAllCars();
        res.status(200).json(cars);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getCarById = async (req, res) => {
    try {
        const car = await carService.getCarById(req.params.id);
        res.status(200).json(car);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getCarsBySellerId = async (req, res) => {
    try {
        const cars = await carService.getCarsBySellerId(req.params.sellerId);
        res.status(200).json(cars);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getCarsByBuyerId = async (req, res) => {
    try {
        const cars = await carService.getCarsByBuyerId(req.params.buyerId);
        res.status(200).json(cars);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export default {
    addCar,
    updateCar,
    deleteCar,
    getAllCars,
    getCarById,
    getCarsBySellerId,
    getCarsByBuyerId
};
