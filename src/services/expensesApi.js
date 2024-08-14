import axios from "axios";
const clientApi = axios.create({
  baseURL: 'http://127.0.0.1:5000/', 
});
export default clientApi;