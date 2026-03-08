import { Event } from "../types/models";

export const getEvents = async (): Promise<Event[]> => {
  return [
    {
      id: "1",
      title: "Hackathon 2026",
      location: "Main Auditorium",
      date: "2026-03-22"
    },
    {
      id: "2",
      title: "AI & ML Workshop",
      location: "Computer Lab 3",
      date: "2026-03-25"
    },
    {
      id: "3",
      title: "Startup Pitch Day",
      location: "Seminar Hall",
      date: "2026-03-28"
    }
  ];
};
