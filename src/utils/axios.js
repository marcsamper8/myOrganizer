import axios from "axios";
import { getAuthToken } from "./authStorage";

const apiBaseUrl =
    import.meta.env.VITE_API_URL || "https://myorganizercore.vercel.app/api";

const api = axios.create({
    baseURL: apiBaseUrl,
});

api.interceptors.request.use((config) => {
    const token = getAuthToken();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;
