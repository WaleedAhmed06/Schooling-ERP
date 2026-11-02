import { getRows, setRows } from "@/features/admin/storage";
import type { Student, StudentInput } from "../types/student.types";
import { validateStudent } from "../schemas/student.schema";
export interface StudentRepository {
  list(): Promise<Student[]>;
  create(data: StudentInput): Promise<Student>;
  update(id: string, data: StudentInput): Promise<Student>;
  remove(id: string): Promise<void>;
}
const load = () => getRows("students") as unknown as Student[];
const save = (items: Student[]) =>
  setRows("students", items as unknown as ReturnType<typeof getRows>);
function assertValid(data: StudentInput, students: Student[], except?: string) {
  const errors = validateStudent(data);
  if (
    students.some(
      (s) =>
        s.admission.toLowerCase() === data.admission.toLowerCase() &&
        s.id !== except,
    )
  )
    errors.admission = "Admission number already exists";
  if (Object.keys(errors).length) throw new Error(Object.values(errors)[0]);
}
export const mockStudentRepository: StudentRepository = {
  async list() {
    return load();
  },
  async create(data) {
    const items = load();
    assertValid(data, items);
    const student = { ...data, id: crypto.randomUUID() };
    save([student, ...items]);
    return student;
  },
  async update(id, data) {
    const items = load();
    assertValid(data, items, id);
    if (!items.some((s) => s.id === id)) throw new Error("Student not found");
    const student = { ...data, id };
    save(items.map((s) => (s.id === id ? student : s)));
    return student;
  },
  async remove(id) {
    save(load().filter((s) => s.id !== id));
  },
};
export const studentService: StudentRepository = mockStudentRepository;
