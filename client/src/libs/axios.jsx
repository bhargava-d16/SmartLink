import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:"https://smartlink-production-6246.up.railway.app",
  withCredentials: true,
});
