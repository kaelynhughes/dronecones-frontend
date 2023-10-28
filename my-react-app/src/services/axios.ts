import axios, { AxiosRequestConfig } from "axios";

const fetchClient = () => {
  const defaultOptions: AxiosRequestConfig = {
    baseURL:
      window.location.hostname !== "localhost"
        ? `https://${window.location.host}/api/v1`
        : "http://localhost:5000/api/v1",
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
    //@ts-expect-error crossorigin is not included in axios' type
    crossorigin: true,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
  };

  // Create instance
  const instance = axios.create(defaultOptions);

  // Redirect to login if the API responds with 401
  //   instance.interceptors.response.use(
  //     function (response) {
  //       return response;
  //     },
  //     function (error) {
  //       if (error.response?.status === 401) {
  //         // Set Deep link for future redirect
  //         sessionStorage.deepLink = window.location.pathname;
  //         window.location.href = "/login";
  //       } else {
  //         throw error;
  //       }
  //     }
  //   );

  return instance;
};

export default fetchClient();
