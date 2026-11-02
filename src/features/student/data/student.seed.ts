import type { Lesson, Quiz } from "../types/student.types";
export const subjects = [
  "Mathematics",
  "English",
  "Science",
  "Computer",
  "Urdu",
  "Social Studies",
  "Islamiat",
];
export const lessons: Lesson[] = [
  {
    id: "l1",
    subject: "Mathematics",
    chapter: "Chapter 5",
    title: "Fractions and Decimals",
    description: "Understand fractions, decimals, and conversion.",
    notes:
      "A fraction represents part of a whole. Divide numerator by denominator to get its decimal form.",
    resources: ["Chapter 5 Notes", "Practice Worksheet"],
  },
  {
    id: "l2",
    subject: "Mathematics",
    chapter: "Chapter 5",
    title: "Adding Fractions",
    description: "Add fractions with common denominators.",
    notes: "Find a common denominator before adding numerators.",
    resources: ["Fractions Practice"],
  },
  {
    id: "l3",
    subject: "English",
    chapter: "Unit 2",
    title: "Reading Comprehension",
    description: "Practice reading and identifying main ideas.",
    notes: "Read the passage carefully and summarize the central idea.",
    resources: ["Reading Guide"],
  },
  {
    id: "l4",
    subject: "Science",
    chapter: "Unit 1",
    title: "The Solar System",
    description: "Explore planets and their orbits.",
    notes: "The Earth orbits the Sun and rotates on its axis.",
    resources: ["Planet Diagram"],
  },
];
export const quizzes: Quiz[] = [
  {
    id: "q1",
    subject: "Mathematics",
    title: "Fractions Quiz",
    durationSeconds: 180,
    questions: [
      {
        id: "q1a",
        prompt: "What is 1/2 as a decimal?",
        kind: "mcq",
        options: ["0.25", "0.5", "2", "1.5"],
        correct: 1,
      },
      {
        id: "q1b",
        prompt: "1/4 + 1/4 = 1/2",
        kind: "boolean",
        options: ["True", "False"],
        correct: 0,
      },
      {
        id: "q1c",
        prompt: "What is 3/4 as a decimal?",
        kind: "mcq",
        options: ["0.3", "0.5", "0.75", "1.25"],
        correct: 2,
      },
    ],
  },
  {
    id: "q2",
    subject: "Science",
    title: "Solar System Basics",
    durationSeconds: 120,
    questions: [
      {
        id: "q2a",
        prompt: "Earth orbits the Sun.",
        kind: "boolean",
        options: ["True", "False"],
        correct: 0,
      },
      {
        id: "q2b",
        prompt: "Which planet is known as the Red Planet?",
        kind: "mcq",
        options: ["Venus", "Mars", "Jupiter", "Neptune"],
        correct: 1,
      },
    ],
  },
];
