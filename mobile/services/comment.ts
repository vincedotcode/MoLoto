import axios, { AxiosError } from "axios";

export interface User {
  _id: string;
  name: string;
  email: string;
}

export interface Comment {
  _id: string;
  user_id: User;
  car_id: string;
  comment: string;
  is_public: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  message: string[];
  error: string;
}

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const addComment = async (
  commentData: Omit<Comment, "_id" | "createdAt" | "updatedAt" | "user_id"> & { user_id: string }
): Promise<Comment> => {
  try {
    const response = await axios.post<Comment>(`${API_URL}/comments`, commentData);
    return response.data;
  } catch (error) {
    console.log(error);
    const axiosError = error as AxiosError<ApiResponse>;
    if (axiosError.response) {
      throw new Error(
        JSON.stringify({
          statusCode: axiosError.response.status,
          message: axiosError.response.data.message || ["An unexpected error occurred"],
          error: axiosError.response.data.error || "Bad Request"
        })
      );
    } else {
      throw new Error(
        JSON.stringify({
          statusCode: 500,
          message: ["Network Error or Internal Server Error"],
          error: "Server Error"
        })
      );
    }
  }
};

export const getCommentsByCarId = async (carId: string): Promise<Comment[]> => {
  try {
    const response = await axios.get<Comment[]>(`${API_URL}/comments/car/${carId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    const axiosError = error as AxiosError<ApiResponse>;
    if (axiosError.response) {
      throw new Error(
        JSON.stringify({
          statusCode: axiosError.response.status,
          message: axiosError.response.data.message || ["An unexpected error occurred"],
          error: axiosError.response.data.error || "Bad Request"
        })
      );
    } else {
      throw new Error(
        JSON.stringify({
          statusCode: 500,
          message: ["Network Error or Internal Server Error"],
          error: "Server Error"
        })
      );
    }
  }
};
