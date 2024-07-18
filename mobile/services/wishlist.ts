import axios, { AxiosError } from 'axios';

export interface WishlistItem {
  _id: string;
  user_id: string;
  car_id: {
    _id: string;
    make: string;
    model: string;
    year: number;
    price: number;
  };
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  message: string[];
  error: string;
}

const API_URL = process.env.EXPO_PUBLIC_API_URL; // Fallback for local development

export const addToWishlist = async (user_id: string, car_id: string): Promise<WishlistItem> => {
  try {
    const response = await axios.post<WishlistItem>(`${API_URL}/wishlist`, {
      user_id,
      car_id,
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

export const removeFromWishlist = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/wishlist/${id}`);
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

export const getWishlistByUserId = async (userId: string): Promise<WishlistItem[]> => {
  try {
    const response = await axios.get<WishlistItem[]>(`${API_URL}/wishlist/user/${userId}`);
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

