import axios, { InternalAxiosRequestConfig } from "axios";
import axiosRateLimit from "axios-rate-limit";

const axiosInstance = axios.create({
  baseURL: "https://danbooru.donmai.us",
});

axiosInstance.interceptors.request.use((value: InternalAxiosRequestConfig<any>) => {
  // console.log(value.params);
  return value;
}, err => {
  console.log(err);
});

export const DanbooruApi = axiosRateLimit(axiosInstance, { maxRequests: 200, perMilliseconds: 1000 });