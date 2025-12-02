import { getToken } from "../utils/storage";

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
