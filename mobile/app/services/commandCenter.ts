const API_URL = "http://localhost:5001";

export const getCommandCenterSummary = async () => {
  try {
    const response = await fetch(`${API_URL}/command-center`);
    if (!response.ok) {
      throw new Error(`Command Center Sync Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch Command Center Error:", error);
    return null;
  }
};
