const Car = require('../models/Car');

const carService = {
    addCar: async (carData) => {
        const car = new Car(carData);
        await car.save();
        return car;
    },

    deleteCar: async (carId, sellerId) => {
        const car = await Car.findOneAndDelete({ _id: carId, seller: sellerId });
        if (!car) {
            throw new Error('Car not found or you do not have permission to delete this car');
        }
        return car;
    },

    getAllCars: async () => {
        return await Car.find({});
    },

    getCarById: async (carId) => {
        const car = await Car.findById(carId);
        if (!car) {
            throw new Error('Car not found');
        }
        return car;
    },

    updateCar: async (carId, sellerId, updateData) => {
        const car = await Car.findOneAndUpdate(
            { _id: carId, seller: sellerId },
            { $set: updateData },
            { new: true }
        );
        if (!car) {
            throw new Error('Car not found or you do not have permission to update this car');
        }
        return car;
    },
};

module.exports = carService;
