import axios, { AxiosError } from "axios";

export interface CarDetails {
    _id: string;
    make: string;
    model: string;
    year: number;
  }
  
  export interface User {
    _id: string;
    name: string;
    email: string;
    phone_number: string;
    address: string;
  }
  
  export interface Appointment {
    _id: string;
    buyer_id: User;
    seller_id: User;
    car_id: CarDetails | null;
    appointment_date: string;
    description: string;
    status: string;
    createdAt: string;
    updatedAt: string;
  }
  
interface ApiResponse {
  message: string[];
  error: string;
}

const API_URL = process.env.EXPO_PUBLIC_API_URL; // Fallback for local development

export const getAllAppointments = async (): Promise<Appointment[]> => {
  try {
    const response = await axios.get<Appointment[]>(`${API_URL}/appointments`);
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

export const getAppointmentById = async (id: string): Promise<Appointment> => {
  try {
    const response = await axios.get<Appointment>(`${API_URL}/appointments/${id}`);
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

interface AddAppointmentData {
  buyer_id: string;
  seller_id: string;
  car_id: string;
  appointment_date: Date;
  description: string;
  status: string;
}

export const addAppointment = async (appointmentData: AddAppointmentData): Promise<Appointment> => {
  try {
    const response = await axios.post<Appointment>(`${API_URL}/appointments`, appointmentData);
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

export const getAppointmentsByBuyerId = async (buyerId: string): Promise<Appointment[]> => {
  try {
    const response = await axios.get<Appointment[]>(`${API_URL}/appointments/buyer/${buyerId}`);
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

export const getAppointmentsBySellerId = async (sellerId: string): Promise<Appointment[]> => {
  try {
    const response = await axios.get<Appointment[]>(`${API_URL}/appointments/seller/${sellerId}`);
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

interface UpdateAppointmentStatusData {
  status: string;
}

export const updateAppointmentStatus = async (id: string, statusData: UpdateAppointmentStatusData): Promise<Appointment> => {
  try {
    const response = await axios.put<Appointment>(`${API_URL}/appointments/${id}/status`, statusData);
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
