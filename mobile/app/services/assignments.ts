import { Assignment } from "../types/models";

export const getAssignments = async (): Promise<Assignment[]> => {
  return [
    {
      id: "1",
      title: "DBMS Assignment 2",
      subject: "Database Systems",
      dueDate: "2026-03-15",
      status: "pending"
    },
    {
      id: "2",
      title: "AI Lab Report",
      subject: "Artificial Intelligence",
      dueDate: "2026-03-18",
      status: "submitted"
    },
    {
      id: "3",
      title: "Operating Systems Homework",
      subject: "Operating Systems",
      dueDate: "2026-03-20",
      status: "pending"
    }
  ];
};
