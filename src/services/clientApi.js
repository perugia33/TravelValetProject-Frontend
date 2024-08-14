import axios from "axios";
const clientApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/',
  // baseURL: 'https://back-end-travel-valet.onrender.com/', 
});
export default clientApi;