import axios from "axios";

const baseUrl = "http://127.0.0.1:5000";

const PaytmEasyApi = axios.create({
  baseURL: baseUrl,
});

export const setAuthorizationToken = (token: string) => {
  localStorage.setItem("token", token);
};

PaytmEasyApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  config.headers.Authorization = token ? `Bearer ${token}` : "";

  return config;
});

export const deleteAuthorizationToken = () => {
  localStorage.removeItem("token");
};

export default PaytmEasyApi;
