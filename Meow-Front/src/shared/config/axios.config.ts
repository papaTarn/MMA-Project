import axios from 'axios';
import cookie from 'cookie';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
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
      const token = localStorage.getItem('_token');
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
  error => {
    let errorMessage = {
      status: '',
      message: '',
      description: ''
    };

    if (error.response) {
      switch (error.response.status) {
        case 400:
          errorMessage.status = error.response.status;
          errorMessage.message = 'Bad Request';
          errorMessage.description = `The request was invalid. Please check your input. (${error.response.status})`;
          break;
        case 401:
          errorMessage.status = error.response.status;
          errorMessage.message = 'Unauthorized';
          errorMessage.description = `You are not authorized. Please log in and try again. (${error.response.status})`;
          break;
        case 403:
          errorMessage.status = error.response.status;
          errorMessage.message = 'Forbidden';
          errorMessage.description = `You do not have permission to access this resource. (${error.response.status})`;
          break;
        case 404:
          errorMessage.status = error.response.status;
          errorMessage.message = 'Not Found';
          errorMessage.description = `The requested resource could not be found. (${error.response.status})`;
          break;
        case 500:
          errorMessage.status = error.response.status;
          errorMessage.message = 'Server Error';
          errorMessage.description = `An internal server error occurred. Please try again later. (${error.response.status})`;
          break;
        default:
          errorMessage.status = error.response.status;
          errorMessage.message = 'Error';
          errorMessage.description = `An unexpected error occurred. (${error.response.status})`;
      }
    } else {
      errorMessage.message = 'Error';
      errorMessage.description = `Network or unexpected error`;
    }

    return Promise.reject(errorMessage);
  }
);

export default axiosInstance;
