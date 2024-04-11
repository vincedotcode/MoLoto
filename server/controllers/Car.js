// controllers/carController.js
const carService = require('../services/Car');

const carController = {
    addCar: async (req, res) => {
        try {
            const sellerId = req.user.id; 
            const carData = { ...req.body, seller: sellerId };
            const car = await carService.addCar(carData);
            res.status(201).json(car);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    getAllCars: async (req, res) => {
        try {
            const cars = await carService.getAllCars();
            res.status(200).json(cars);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

module.exports = carController;
