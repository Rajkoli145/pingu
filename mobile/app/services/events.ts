import { Event } from "../types/models";

export const getEvents = async (): Promise<Event[]> => {
  try {
    const response = await fetch("http://localhost:5001/events");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return [];
  }
};
