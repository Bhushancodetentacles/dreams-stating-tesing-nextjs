// api.js
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "nextjs-toploader/app";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Helper function to extract error message from different response structures
const getErrorMessage = (error) => {
    // Handle Defender API error structure
    if (error?.response?.data?.message?.response?.data?.message) {
        return error?.response?.data?.message?.response?.data?.message;
    }

    // Handle regular API error structure
    if (error?.response?.data?.message) {
        return error.response.data.message;
    }

    // Handle case where error itself is a string
    if (typeof error === "string") {
        return error;
    }

    // Handle plain error object with message
    if (error?.message && typeof error.message === "string") {
        return error.message;
    }

    // Default fallback
    return "An unexpected error occurred";
};

export const useApi = () => {
    const router = useRouter();
    const { handleLogOut } = useDynamicContext();

    api.interceptors.request.use((config) => {
        // Check for token in both localStorage and sessionStorage
        const token =
            localStorage.getItem("dynamic_authentication_token") ||
            sessionStorage.getItem("dynamic_authentication_token");
        if (token) {
            config.headers["token"] = token; // Add token to the headers
        }
        return config;
    });

    const get = async (url, params = {}, additionalHeaders = {}) => {
        try {
            const result = await api.get(url, {
                params,
                headers: {
                    ...api.defaults.headers,
                    ...additionalHeaders,
                },
            });
            return result.data;
        } catch (error) {
            console.error("An error occurred while making a GET request:", error);
            throw error;
        }
    };

    const post = async (url, data = {}, additionalHeaders = {}) => {
        try {
            const isFormData = data instanceof FormData;
            const headers = {
                ...api.defaults.headers,
                "Content-Type": isFormData ? "multipart/form-data" : "application/json",
                ...additionalHeaders, // Allow additional headers to overwrite
            };

            const result = await api.post(url, data, { headers });
            return result.data;
        } catch (error) {
            const errorMessage = getErrorMessage(error);
            const finalMessage = errorMessage && typeof errorMessage === 'string' ? errorMessage : 'Something went wrong';
            
            toast.error(finalMessage);
            console.error("API Error Details:", {
                url,
                errorMessage,
                fullError: error,
            });
            throw error;
        }
    };

    api.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            if (error.response) {
                const { data, status } = error.response;

                if (status === 401) {
                    localStorage.removeItem("dynamic_authentication_token");
                    await handleLogOut();
                    window.location.href = "/login";
                } else if (status === 403) {
                    localStorage.removeItem("dynamic_authentication_token");

                    router.push("/access-denied");
                    // toast.error(data.message);
                }
            }
            return Promise.reject(error);
        }
    );

    return { get, post };
};
