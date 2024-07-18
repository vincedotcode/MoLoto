import axios, { AxiosError } from 'axios';

export interface Review {
  _id: string;
  user_id: {
    _id: string;
    name: string;
    email: string;
  };
  car_id: string;
  rating: number;
  review: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  message: string[];
  error: string;
}

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const createReview = async (user_id: string, car_id: string, rating: number, review: string): Promise<Review> => {
  try {
    const response = await axios.post<Review>(`${API_URL}/reviews`, {
      user_id,
      car_id,
      rating,
      review,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    const axiosError = error as AxiosError<ApiResponse>;
    if (axiosError.response) {
      throw new Error(
        JSON.stringify({
          statusCode: axiosError.response.status,
          message: axiosError.response.data.message || ['An unexpected error occurred'],
          error: axiosError.response.data.error || 'Bad Request',
        })
      );
    } else {
      throw new Error(
        JSON.stringify({
          statusCode: 500,
          message: ['Network Error or Internal Server Error'],
          error: 'Server Error',
        })
      );
    }
  }
};

export const getReviewsByCarId = async (car_id: string): Promise<Review[]> => {
  try {
    const response = await axios.get<Review[]>(`${API_URL}/reviews/car/${car_id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    const axiosError = error as AxiosError<ApiResponse>;
    if (axiosError.response) {
      throw new Error(
        JSON.stringify({
          statusCode: axiosError.response.status,
          message: axiosError.response.data.message || ['An unexpected error occurred'],
          error: axiosError.response.data.error || 'Bad Request',
        })
      );
    } else {
      throw new Error(
        JSON.stringify({
          statusCode: 500,
          message: ['Network Error or Internal Server Error'],
          error: 'Server Error',
        })
      );
    }
  }
};

export const getReviewsByUserId = async (user_id: string): Promise<Review[]> => {
  try {
    const response = await axios.get<Review[]>(`${API_URL}/reviews/user/${user_id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    const axiosError = error as AxiosError<ApiResponse>;
    if (axiosError.response) {
      throw new Error(
        JSON.stringify({
          statusCode: axiosError.response.status,
          message: axiosError.response.data.message || ['An unexpected error occurred'],
          error: axiosError.response.data.error || 'Bad Request',
        })
      );
    } else {
      throw new Error(
        JSON.stringify({
          statusCode: 500,
          message: ['Network Error or Internal Server Error'],
          error: 'Server Error',
        })
      );
    }
  }
};

export const deleteReview = async (review_id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/reviews/${review_id}`);
  } catch (error) {
    console.log(error);
    const axiosError = error as AxiosError<ApiResponse>;
    if (axiosError.response) {
      throw new Error(
        JSON.stringify({
          statusCode: axiosError.response.status,
          message: axiosError.response.data.message || ['An unexpected error occurred'],
          error: axiosError.response.data.error || 'Bad Request',
        })
      );
    } else {
      throw new Error(
        JSON.stringify({
          statusCode: 500,
          message: ['Network Error or Internal Server Error'],
          error: 'Server Error',
        })
      );
    }
  }
};
