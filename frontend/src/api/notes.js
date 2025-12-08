import { toast } from "react-toastify";
import { getToken } from "../utils/storage";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "";

export const fetchNotes = async () => {
  const res = await fetch(`${API_URL}/api/v1/notes`, {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` },
  });
  return res.json();
};

export const createNote = async (data) => {
  const res = await fetch(`${API_URL}/api/v1/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteNote = async (id) => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.delete(`${API_URL}/api/v1/notes/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error("Delete error:", err.response?.data || err.message);
    toast.error("Delete error:", err.response?.data || err.message);
    return { error: true };
  }
};


export const updateNote = async (id, data) => {
  const res = await fetch(`${API_URL}/api/v1/notes/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

