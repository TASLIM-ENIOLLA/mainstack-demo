import axios from "axios";

export const api = axios.create({
  timeout: 2500,
  baseURL: "https://fe-task-api.mainstack.io/",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => config);

api.interceptors.response.use(
  function(response) {
    return {
      ...response,
      success: true,
      data: response.data,
      message: response.data,
    }
  },
  function (error) {
    throw error;
  }
);