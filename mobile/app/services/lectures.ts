import { Lecture } from "../types/models";
import { getAuthToken } from "./auth";

export const getLectures = async (): Promise<Lecture[]> => {
  try {
    const token = getAuthToken();
    const response = await fetch("http://localhost:5001/lectures", {
      headers: { "Authorization": `Bearer ${token}` }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch lectures:", error);
    return [];
  }
};
