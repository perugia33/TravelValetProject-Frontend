import axios from "axios";
const expensesApi = axios.create({
  baseURL: 'http://127.0.0.1:5000/expenses', 
});
export default expensesApi;