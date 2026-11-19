export type Employee = {
  _id: string;
  serial: number;
  name: string;
  number: string;
  notes: string;
  photoUrl: string;
  status: "active" | "inactive" | "pending" | "rejected";
  grade: "a" | "b" | "c" | "d" | "e";
};

export type EmployeeInput = {
  name: string;
  number: string;
  notes?: string;
  photoUrl?: string;
  serial?: number;
  status?: "active" | "inactive" | "pending" | "rejected";
  grade?: "a" | "b" | "c" | "d" | "e";
};

export type ActionResult = {
  success: boolean;
  message: string;
};
