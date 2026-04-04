import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5001', // local
  // baseURL: 'http://3.26.96.188:5001', // live
  headers: { 'Content-Type': 'application/json' },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const userInfo = localStorage.getItem('userInfo') 
      ? JSON.parse(localStorage.getItem('userInfo')) 
      : null;

    if (userInfo && userInfo.token) {
      config.headers.Authorization = `Bearer ${userInfo.token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;