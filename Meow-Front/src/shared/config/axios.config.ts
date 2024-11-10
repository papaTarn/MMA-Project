import axios from 'axios';
import cookie from 'cookie';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

axiosInstance.interceptors.request.use(
  config => {
    if (typeof window === 'undefined') {
      // SSR: Get token from cookies
      if (config.headers?.cookie) {
        const parsedCookie = cookie.parse(config.headers.cookie);
        const token = parsedCookie.token;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    } else {
      // Client-side: Get token from localStorage
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  error => error,
);

axiosInstance.interceptors.response.use(
  response => response,
  error => error,
);

export default axiosInstance;
