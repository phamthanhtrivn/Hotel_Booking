import { BASE_API_URL } from "@/contants/config";
import axios from "axios";

const api = axios.create({
  baseURL: BASE_API_URL,
  timeout: 30000,
});

export default api;