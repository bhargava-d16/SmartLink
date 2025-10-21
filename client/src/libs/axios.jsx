import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:"https://smartlink-fbbw.onrender.com",
  // baseURL:"http://localhost:8080/api/",
  withCredentials: true,
});
