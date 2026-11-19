export type Employee = {
  _id: string;
  serial: number;
  name: string;
  number: string;
  notes: string;
  photoUrl: string;
};

export type EmployeeInput = {
  name: string;
  number: string;
  notes?: string;
  photoUrl?: string;
  serial?: number;
};

export type ActionResult = {
  success: boolean;
  message: string;
};
