import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:"smartlink-production-6246.up.railway.app",
  withCredentials: true,
});
