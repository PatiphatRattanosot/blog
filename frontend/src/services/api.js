import axios from "axios";
const baseURL = import.meta.env.VITE_BASE_URL;
import TokenServices from "./token.service";
const instance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use((config) => {
  const token = TokenServices.getLocalAccessToken()
  if (token) {
    config.headers['x-access-token'] = token
  }
  return config
})
export default instance;