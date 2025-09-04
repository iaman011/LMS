import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  withCredentials: true, // 🔑 send cookies (JWT) with every request
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
