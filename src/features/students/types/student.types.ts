export interface Student {
  id: string;
  name: string;
  admission: string;
  roll: string;
  class: string;
  section: string;
  session: string;
  admissionDate: string;
  dob: string;
  gender: string;
  blood: string;
  address: string;
  phone: string;
  father: string;
  mother: string;
  parentPhone: string;
  parentEmail: string;
  photo: string;
  documents: string;
  history: string;
  performance: string;
}
export type StudentInput = Omit<Student, "id">;
