import { Lecture } from "../types/models";

export const getLectures = async (): Promise<Lecture[]> => {
  return [
    {
      id: "1",
      subject: "Data Structures",
      professor: "Dr. Sharma",
      time: "10:00 AM"
    },
    {
      id: "2",
      subject: "Operating Systems",
      professor: "Prof. Mehta",
      time: "1:00 PM"
    },
    {
      id: "3",
      subject: "Artificial Intelligence",
      professor: "Dr. Rao",
      time: "3:00 PM"
    }
  ];
};
