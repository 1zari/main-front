import axios from "axios";
import { IS_PRODUCTION } from "../constants/env";

const baseURL = IS_PRODUCTION ? "https://api.production.com" : "https://api.staging.com";

export const axiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
