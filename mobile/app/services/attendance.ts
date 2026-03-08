import { Attendance } from "../types/models";

export const getAttendance = async (): Promise<Attendance[]> => {
  try {
    const response = await fetch("http://localhost:5001/attendance");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    // The backend returns { overallAttendance, subjects, ... }
    // However the frontend expects Attendance[] for subjects.
    return data.subjects.map((sub: any, index: number) => ({
      id: String(index + 1),
      subject: sub.subject,
      attended: Math.round((sub.attendance / 100) * 20), // Placeholder logic for mock UI
      total: 20
    }));
  } catch (error) {
    console.error("Failed to fetch attendance:", error);
    return [];
  }
};
