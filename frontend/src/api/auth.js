import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "";

export const loginUser = async (email, password) => {
  try {
    const res = await axios.post(`${API_URL}/api/v1/login`, {
      email,
      password,
    });

    return res.data;
  } catch (err) {
    // normalize error shape
    const data = err.response?.data;
    console.error("Login error:", data || err.message);
    return data || { error: true };
  }
};

export const registerUser = async (name, email, password, password_confirmation) => {
  try {
    const res = await axios.post(`${API_URL}/api/v1/register`, {
      name,
      email,
      password,
      password_confirmation,
    });

    return res.data;
  } catch (err) {
    const data = err.response?.data;
    console.error("Register error:", data || err.message);
    return data || { error: true };
  }
};
