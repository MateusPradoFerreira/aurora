import axios from "axios";
import axiosRateLimit from "axios-rate-limit";

const axiosInstance = axios.create({
  baseURL: "https://danbooru.donmai.us",
});

export const DanbooruApi = axiosRateLimit(axiosInstance, { maxRequests: 3, perMilliseconds: 1000 });