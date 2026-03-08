import { Notice } from "../types/models";

export const getNotices = async (): Promise<Notice[]> => {
  try {
    const response = await fetch("http://localhost:5001/notices");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch notices:", error);
    return [];
  }
};
