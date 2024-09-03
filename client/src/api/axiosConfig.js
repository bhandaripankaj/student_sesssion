import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/',
});

// Add a request interceptor to include the token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    console.log("token",token)
    if (token) {
      config.headers["token"] = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
