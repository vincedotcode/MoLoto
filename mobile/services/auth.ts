import axios, { AxiosError } from "axios";
import { saveToken, saveUser } from "@/hooks/useStorage";

interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  phone_number: string;
  address: string;
  role: "buyer" | "seller";
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface UserData {
  _id: string;
  name: string;
  email: string;
  phone_number: string;
  address: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

interface RegisterResponse {
  message: string;
  user: UserData;
  token: string;
}

interface ApiResponse {
  message: string[];
  error: string;
}

interface LoginResponse {
  success: boolean;
  token: string;
  user: UserData;
}

export const register = async (credentials: RegisterCredentials): Promise<RegisterResponse> => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/auth/signup`;

  try {
    const response = await axios.post<RegisterResponse>(url, credentials);
    const { token, user } = response.data;
    await saveToken(token);
    await saveUser(user);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiResponse>;
    console.log(axiosError);
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

export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/auth/login`;

  try {
    const response = await axios.post<LoginResponse>(url, credentials);
    const { token, user } = response.data;
    await saveToken(token);
    await saveUser(user);
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

export const getUserById = async (userId: string): Promise<UserData> => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/auth/user/${userId}`;

  try {
    const response = await axios.get<{ user: UserData }>(url);
    return response.data.user;
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
