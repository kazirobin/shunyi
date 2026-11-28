export interface IProcess {
  _id?: string;
  serial: number;
  title: string;
  description?: string;
  label?: string;
}

export interface IInputEntry {
  _id?: string;
  date: string;
  workName: string;
  color?: string;
  size?: string;
  pieces: number;
  note?: string;
}

export interface IOutputEntry {
  _id?: string;
  date: string;
  workName?: string;
  color?: string;
  size?: string;
  pieces: number;
  note?: string;
}

export interface IProduct {
  _id?: string;
  name: string;
  inputs: IInputEntry[];
  outputs: IOutputEntry[];
  processes: IProcess[];
  createdAt?: string;
  updatedAt?: string;
}