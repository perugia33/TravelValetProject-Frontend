import axios from "axios";
const clientApi = axios.create({
  baseURL: 'http://127.0.0.1:5000/',
  // baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/',
  // baseURL: 'https://back-end-travel-valet.onrender.com/', 
});
export default clientApi;