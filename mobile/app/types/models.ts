export interface Assignment {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  status: "pending" | "submitted";
}

export interface Notice {
  id: string;
  title: string;
  description: string;
  date: string;
}

export interface Event {
  id: string;
  title: string;
  location: string;
  date: string;
}

export interface Lecture {
  id: string;
  subject: string;
  professor: string;
  time: string;
}

export interface Attendance {
  id: string;
  subject: string;
  attended: number;
  total: number;
}
