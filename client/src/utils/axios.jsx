import axios from "axios";
// config
import { HOST_API } from "../config";
import { setSession } from "./jwt";

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: HOST_API,
});

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error?.response?.status === 401) {
      setSession(null);
      localStorage.removeItem("userDetails");
      window.location.href = "/auth/login";
    }
    throw error;
  }
);

export default axiosInstance;
