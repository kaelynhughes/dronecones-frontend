import axios, { AxiosRequestConfig } from "axios";

const fetchClient = () => {
  const defaultOptions: AxiosRequestConfig = {
    baseURL:
      window.location.hostname !== "localhost"
        ? `http://${window.location.host}`
        : "http://localhost:5000",
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Create instance
  const instance = axios.create(defaultOptions);
  return instance;
};

export default fetchClient();
