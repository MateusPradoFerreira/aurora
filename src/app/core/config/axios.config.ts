import axios from "axios";

export const DanbooruApi = axios.create({
  baseURL: "https://danbooru.donmai.us",
});