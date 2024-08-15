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
    console.log('Request Config:', config);
    // Return the modified config object:
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    // If there is an error in request config, reject the promise with the error
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors globally
clientApi.interceptors.response.use(
  (response) => {
    console.log('Response Data:', response.data); // Log response data
    return response;
  },
  (error) => {
    if (error.response) {
      console.error('API error response', {
        status: error.response.status,
        headers: error.response.headers,
        data: error.response.data
      });
    } else if (error.request) {
      console.error('API call error: No response received', error.request);
    } else {
      console.error('API call error (IM refactored code):', error.message);
    }
    return Promise.reject(error);
  }
);

export default clientApi;

