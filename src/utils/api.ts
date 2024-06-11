import axios from "axios";

export const api = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "api-key": process.env.API_KEY,
  },
});
