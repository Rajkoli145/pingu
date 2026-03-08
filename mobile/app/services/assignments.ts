import { Assignment } from "../types/models";

export const getAssignments = async (): Promise<Assignment[]> => {
  try {
    const response = await fetch("http://localhost:5001/assignments");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch assignments:", error);
    return [];
  }
};
