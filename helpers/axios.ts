import axios from "axios";

const EXPRESS_BASE_URL = "http://192.168.1.30:3500";
const FLASK_BASE_URL = "http://192.168.1.30:8000";

const expressInstance = axios.create({
    baseURL: EXPRESS_BASE_URL,
    headers: { "Content-Type": "application/json" },
});

const flaskInstance = axios.create({
    baseURL: FLASK_BASE_URL,
    headers: { "Content-Type": "application/json" },
});

export { expressInstance, flaskInstance };