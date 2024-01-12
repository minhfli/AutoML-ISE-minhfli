import config from "@/config/config";
import axios from "axios";

const instance = axios.create({
    baseURL: config.backendURL,
    withCredentials: true,
})