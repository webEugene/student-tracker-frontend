// Axios settings
import axios from 'axios';
import authHeader from './services/auth-header';
import { AuthService } from './services/auth.service';
export { axiosHandler };

// Instance for axiosHandler
const axiosHandler = axios.create({
  headers: {
    ...authHeader(),
    'cache-control': 'no-cache',
    'content-type': 'application/json',
  },
});

// Interceptor for request
axiosHandler.interceptors.request.use((config) => {
  // if token expire - logout
  if (!AuthService.isLoggedIn()) {
    AuthService.logout();
    throw new Error('Expire token');
  }
  return config;
});

// Interceptor for response
axiosHandler.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    try {
      if (error.response && error.response.data.status === 422) {
        error.message = JSON.parse(error.response.data.message);
      } else {
        error.message = error.response ? error.response.data.message : error.message;
      }
    } catch (error) {
      error.message = error.response.data.message;
    }
    return Promise.reject(error);
  },
);
