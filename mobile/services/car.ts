import axios, { AxiosError } from "axios";

export interface Seller {
  _id: string;
  name: string;
  email: string;
  phone_number: string;
  address: string;
}

export interface Car {
  _id: string;
  seller_id: Seller;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  engine_type: string;
  fuel_efficiency: number;
  transmission_type: string;
  fuel_type: string;
  has_never_been_in_accident: boolean;
  insurance_number: string;
  car_number: string;
  description: string;
  image_urls: string[];
  is_sold: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
  car_type: string;
}

interface ApiResponse {
  message: string[];
  error: string;
}

const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:8080/api"; // Fallback for local development

export const getAllCars = async (): Promise<Car[]> => {
  try {
    const response = await axios.get<Car[]>(`${API_URL}/cars`);
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

export const getCarById = async (id: string): Promise<Car> => {
  try {
    const response = await axios.get<Car>(`${API_URL}/cars/${id}`);
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
