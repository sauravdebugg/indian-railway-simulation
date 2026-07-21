import axios from "axios";

const baseURL = import.meta.env.VITE_OPENRAIL_API_URL || "http://localhost:5277";

export const API = axios.create({
  baseURL,
});