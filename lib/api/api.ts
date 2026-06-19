import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_APP_URL;

export const api = axios.create({
  baseURL,
  withCredentials: true,
});