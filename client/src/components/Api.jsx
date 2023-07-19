import axios from "axios";

// Replace BASE_URL with your backend server's URL
const BASE_URL = "http://127.0.0.1:5555/";

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Other API functions can be defined here for making different requests
