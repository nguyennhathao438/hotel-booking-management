import axios from "axios";

// Tạo instance axios
const api = axios.create({
  baseURL: "http://localhost:8080/api", // URL backend
  headers: {
    "Content-Type": "application/json",
  },
})
api.interceptors.request.use((config) =>{
    const token = localStorage.getItem("token");
    if(token && !config.url.includes("/auth/login") && !config.url.includes("/users/register")){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
  return Promise.reject(error);})
export default api;