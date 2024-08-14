import axios from "axios";
const clientApi = axios.create({
  baseURL: 'https://back-end-travel-valet.onrender.com/', 
});
export default clientApi;