import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const axiosInstancePublic = axios.create({
  baseURL,
  timeout: 5 * 60 * 1000,
  headers: { "Content-Type": "application/json" },
});

export const axiosInstance = axios.create({
  baseURL,
  timeout: 5 * 60 * 1000,
  headers: { "Content-Type": "application/json" },
});

const getToken = () => {
  return localStorage.getItem("accessToken");
};

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
