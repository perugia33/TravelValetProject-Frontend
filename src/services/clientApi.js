import axios from "axios";

// Create an Axios instance:
const clientApi = axios.create({
  // Set the base URL for all requests
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Request interceptor to include authorization token
clientApi.interceptors.request.use(
  // config - object represents the config of the HTTP request. Automatically provided by Axios.
  (config) => {
    // Get token from local storage
    const token = localStorage.getItem('jwt');
    if (token) {
      // if token exists, add it to request Authorization header
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Return the modified config object:
    return config;
  },
  (error) => {
    // If there is an error in request config, reject the promise with the error
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors globally
clientApi.interceptors.response.use(
  (response) => {
    // if response is successful return it
    return response;
  },
  (error) => {
    console.error('API call error (IM refactored code):', error);
    return Promise.reject(error);
  }
);

export default clientApi;

