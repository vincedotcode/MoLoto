const carSchema = {
    type: 'object',
    properties: {
        seller_id: { type: 'string' },
        buyer_id: { type: 'string' },
        make: { type: 'string' },
        model: { type: 'string' },
        year: { type: 'number' },
        price: { type: 'number' },
        mileage: { type: 'number' },
        engine_type: { type: 'string' },
        fuel_efficiency: { type: 'number' },
        transmission_type: {
            type: 'string',
            enum: ['automatic', 'manual', 'semi-automatic'],
        },
        fuel_type: {
            type: 'string',
            enum: ['petrol', 'diesel', 'electric', 'hybrid'],
        },
        has_never_been_in_accident: { type: 'boolean' },
        insurance_number: { type: 'string' },
        car_number: { type: 'string' },
        description: { type: 'string' },
        image_urls: {
            type: 'array',
            items: { type: 'string' },
        },
        is_sold: { type: 'boolean' },
        status: {
            type: 'string',
            enum: ['available', 'sold'],
        },
        car_type: {
            type: 'string',
            enum: ['sedan', 'hatchback', 'SUV', 'coupé', 'convertible', 'wagon', 'pickup', 'minivan', 'sports car', 'electric', 'hybrid', 'luxury', 'off-road', 'other'],
        },
    },
};

const wishlistSchema = {
    type: 'object',
    properties: {
        user_id: { type: 'string' },
        car_id: { type: 'string' },
    },
};

const commentSchema = {
    type: 'object',
    properties: {
        user_id: { type: 'string' },
        car_id: { type: 'string' },
        comment: { type: 'string' },
        is_public: { type: 'boolean' },
    },
};

const reviewSchema = {
    type: 'object',
    properties: {
        user_id: { type: 'string' },
        car_id: { type: 'string' },
        rating: { type: 'number' },
        review: { type: 'string' },
    },
};

export default {
    carSchema,
    wishlistSchema,
    commentSchema,
    reviewSchema,
};
