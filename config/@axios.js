import axios from "axios";
import PubSub from "pubsub-js";

import AsyncStorage from "@react-native-async-storage/async-storage";

let apiUrl = "http://localhost:8080/";

const createMeaningfulMessage = (err) => {
  let errorMessage;
  const response = err?.response;

  if (!response) {
    errorMessage = "Please check your internet connection.";
  } else {
    errorMessage = "There was an unexpected error.";
  }

  if (response?.data?.message) {
    errorMessage = response.data.message;
  }

  return errorMessage;
};

const instance = axios.create({
  baseURL: apiUrl,
});

instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    error.response.message = createMeaningfulMessage(error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    if (error?.response?.status === 401) {
      PubSub.publish("auth", "denied");
    }

    error.message = createMeaningfulMessage(error);
    return Promise.reject(error);
  }
);

export default instance;
