import { addCar, updateCar, deleteCar, getAllCars, getCarById, getCarsBySellerId, getCarsByBuyerId } from '../services/Car.js';

const addCarHandler = async (req, res) => {
    try {
        const car = await addCar(req.body);
        res.status(201).json({ message: 'Car added successfully', car });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateCarHandler = async (req, res) => {
    try {
        const car = await updateCar(req.params.id, req.body);
        res.status(200).json({ message: 'Car updated successfully', car });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteCarHandler = async (req, res) => {
    try {
        const car = await deleteCar(req.params.id);
        res.status(200).json({ message: 'Car deleted successfully', car });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllCarsHandler = async (req, res) => {
    try {
        const cars = await getAllCars();
        res.status(200).json(cars);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getCarByIdHandler = async (req, res) => {
    try {
        const car = await getCarById(req.params.id);
        res.status(200).json(car);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getCarsBySellerIdHandler = async (req, res) => {
    try {
        const cars = await getCarsBySellerId(req.params.sellerId);
        res.status(200).json(cars);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getCarsByBuyerIdHandler = async (req, res) => {
    try {
        const cars = await getCarsByBuyerId(req.params.buyerId);
        res.status(200).json(cars);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const carController = {
    addCar: addCarHandler,
    updateCar: updateCarHandler,
    deleteCar: deleteCarHandler,
    getAllCars: getAllCarsHandler,
    getCarById: getCarByIdHandler,
    getCarsBySellerId: getCarsBySellerIdHandler,
    getCarsByBuyerId: getCarsByBuyerIdHandler,
  };
  
  export default carController;