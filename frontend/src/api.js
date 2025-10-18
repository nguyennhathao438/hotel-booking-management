import axios from "axios";

// Tạo instance axios
axios.defaults.withCredentials = true;
const api = axios.create({
  baseURL: "http://localhost:8080/api", // URL backend
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
})
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && !config.url.includes("/auth/login") && !config.url.includes("/users/register") && !config.url.includes("/hotels/all")) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
})
export default api;

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await axios.post('http://localhost:8080/api/auth/refresh', null, { withCredentials: true });
        const newAccessToken = refreshResponse.data.result.accessToken;
        console.log(newAccessToken)
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        return axios(originalRequest);
      } catch (refreshError) {
        console.log('Refresh token failed:', refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
