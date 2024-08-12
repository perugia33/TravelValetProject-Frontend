import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

const useApi = () => {
    const { auth } = useAuth();

    const api = axios.create({
        baseURL: "http://127.0.0.1:5000/packing-list",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': auth ? `Bearer ${auth}` : '',
        }
    });
    return api
};

export default useApi;