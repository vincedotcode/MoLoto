import axios, { AxiosResponse, AxiosError } from 'axios';

interface ApiResponse<T> {
    data: T;
    message: string[];
    error: string;
}

export interface UploadImageResponse {
    imageUrl: string;
}

export const uploadImage = async (imageFile: { uri: string; name: string; type: string; }): Promise<UploadImageResponse> => {
    const url = `${process.env.EXPO_PUBLIC_API_URL}/image/upload`;
    
    const formData = new FormData();
    formData.append('image', {
        uri: imageFile.uri,
        name: imageFile.name,
        type: imageFile.type,
    } as unknown as Blob); // Ensure it's correctly cast to Blob

    try {
        const response: AxiosResponse<UploadImageResponse> = await axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        if (response.data && response.data.imageUrl) {
            return response.data;
        }
        throw new Error('No data received');
    } catch (error) {
        const axiosError = error as AxiosError<ApiResponse<any>>;
        if (axiosError.response) {
            throw new Error(JSON.stringify({
                statusCode: axiosError.response.status,
                message: axiosError.response.data.message || ['An unexpected error occurred'],
                error: axiosError.response.data.error || 'Bad Request'
            }));
        } else {
            throw new Error(JSON.stringify({
                statusCode: 500,
                message: ['Network Error or Internal Server Error'],
                error: 'Server Error'
            }));
        }
    }
};
