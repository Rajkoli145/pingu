import { getAuthToken } from "./auth";

const API_URL = "http://localhost:5001";

export const getNotifications = async () => {
  try {
    const token = getAuthToken();
    const response = await fetch(`${API_URL}/notifications`, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    if (!response.ok) {
      throw new Error(`Notifications Sync Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch Notifications Error:", error);
    return [];
  }
};

export const markAsRead = async (id: string) => {
  try {
    const token = getAuthToken();
    const response = await fetch(`${API_URL}/notifications/${id}/read`, {
      method: "PATCH",
      headers: { "Authorization": `Bearer ${token}` }
    });
    return await response.json();
  } catch (error) {
    console.error("Mark Read Error:", error);
    return null;
  }
};

export const clearNotification = async (id: string) => {
  try {
    const token = getAuthToken();
    const response = await fetch(`${API_URL}/notifications/${id}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` }
    });
    return await response.json();
  } catch (error) {
    console.error("Clear Notification Error:", error);
    return null;
  }
};
