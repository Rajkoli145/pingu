import { Notice } from "../types/models";

export const getNotices = async (): Promise<Notice[]> => {
  return [
    {
      id: "1",
      title: "Midterm Exam Schedule Released",
      description: "The midterm exam timetable has been published by the department.",
      date: "2026-03-10"
    },
    {
      id: "2",
      title: "AI Workshop Announcement",
      description: "An AI workshop will be conducted this Friday in the main auditorium.",
      date: "2026-03-12"
    },
    {
      id: "3",
      title: "Library Timing Update",
      description: "The library will remain open until 10 PM during exam week.",
      date: "2026-03-14"
    }
  ];
};
