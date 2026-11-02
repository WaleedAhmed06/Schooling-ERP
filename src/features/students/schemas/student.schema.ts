import type { StudentInput } from "../types/student.types";
export function validateStudent(input: StudentInput): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const key of [
    "name",
    "admission",
    "roll",
    "class",
    "section",
    "session",
    "father",
    "parentPhone",
  ] as const)
    if (!input[key]?.trim()) errors[key] = "This field is required";
  if (
    input.parentEmail &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.parentEmail)
  )
    errors.parentEmail = "Enter a valid email";
  return errors;
}
