// src/services/api.ts
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4000", // Change this if you deploy
  withCredentials: true,
});

export default instance;
