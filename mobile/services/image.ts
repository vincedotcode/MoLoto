import axios, { AxiosError } from "axios";
import mime from "mime-types";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

interface ApiResponse {
    message?: string[];
    error?: string;
    imageUrl?: string;
}

export const uploadImage = async (imageUri: string): Promise<string> => {
    const fileType = mime.lookup(imageUri) || "image/jpeg";
    const fileName = imageUri.split("/").pop() || "photo.jpg";

    const formData = new FormData();
    formData.append("image", {
        uri: imageUri,
        name: fileName,
        type: fileType,
    } as any); // Add type assertion

    try {
        const response = await axios.post<ApiResponse>(`${API_URL}/image/upload`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        if (response.data.imageUrl) {
            return response.data.imageUrl;
        } else {
            throw new Error("Image upload failed");
        }
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
