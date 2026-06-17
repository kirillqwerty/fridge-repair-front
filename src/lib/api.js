import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "";
export const API_BASE = `${BACKEND_URL}/api`;
export const UPLOAD_BASE = BACKEND_URL;

export const api = axios.create({ baseURL: API_BASE });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("admin_token");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export function fullUploadUrl(url) {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("/")) return `${UPLOAD_BASE}${url}`;
  return `${UPLOAD_BASE}/${url}`;
}

export function formatPhoneHref(phone) {
  if (!phone) return "";
  return `tel:${phone.replace(/[^+\d]/g, "")}`;
}
