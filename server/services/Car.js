import Car from '../models/Car.js';

// Add a new car
const addCar = async (carData) => {
    const car = new Car(carData);
    await car.save();
    return car;
};

// Update an existing car
const updateCar = async (carId, updateData) => {
    const car = await Car.findByIdAndUpdate(carId, updateData, { new: true });
    if (!car) {
        throw new Error('Car not found');
    }
    return car;
};

// Delete a car
const deleteCar = async (carId) => {
    const car = await Car.findByIdAndDelete(carId);
    if (!car) {
        throw new Error('Car not found');
    }
    return car;
};

// Get all cars
const  getAllCars = async () => {
    const cars = await Car.find().populate('seller_id', 'name email phone_number address');
    return cars;
};

// Get a car by ID
const getCarById = async (carId) => {
    const car = await Car.findById(carId).populate('seller_id', 'name email phone_number address');
    if (!car) {
        throw new Error('Car not found');
    }
    return car;
};

// Get cars by seller ID
const getCarsBySellerId = async (sellerId) => {
    const cars = await Car.find({ seller_id: sellerId }).populate('seller_id', 'name email phone_number address');
    return cars;
};

// Get cars by buyer ID
const getCarsByBuyerId = async (buyerId) => {
    const cars = await Car.find({ buyer_id: buyerId }).populate('seller_id', 'name email phone_number address');
    return cars;
};

export {
    addCar,
    updateCar,
    deleteCar,
    getAllCars,
    getCarById,
    getCarsBySellerId,
    getCarsByBuyerId
};
