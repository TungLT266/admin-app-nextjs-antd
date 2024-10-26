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

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("accessToken");
      window.location.href = "/auth/login";
    }
    return Promise.reject(error.response.data.message);
  }
);
