import axios from "axios";
import { toast } from "react-toastify";

const url = import.meta.env.VITE_API_URL
const api = axios.create({
    baseURL: url,
    withCredentials: true,
})



export default api