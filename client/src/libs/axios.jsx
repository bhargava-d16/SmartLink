import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:"https://smartlink-fbbw.onrender.com",
  withCredentials: true,
});
