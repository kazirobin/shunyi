export const ATTENDANCE_STATUSES = ["present", "late", "absent", "leave"] as const;
export type AttendanceStatus = (typeof ATTENDANCE_STATUSES)[number];

export type AttendanceRecord = {
  employeeId: string;
  date: string;
  status: AttendanceStatus;
  checkIn: string;
  checkOut: string;
  note: string;
};

export type AttendanceEmployee = {
  _id: string;
  serial: number;
  name: string;
  number: string;
  photoUrl: string;
  grade: string;
};

export type AttendanceInput = {
  status: AttendanceStatus;
  checkIn?: string;
  checkOut?: string;
  note?: string;
};
