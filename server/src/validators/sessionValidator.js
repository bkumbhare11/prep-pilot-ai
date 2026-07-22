import { z } from "zod";

const practiceSchema = z.object({
  mode: z.literal("practice"),
  title: z.string().trim().min(3, "Title must be at least 3 characters"),
  topics: z
    .array(z.string().trim().min(3, "Topic Cannot be empty"))
    .min(1, "Enter at least one topic"),
  difficulty: z.enum(["easy", "medium", "hard"]),
  questionType: z.enum(["theory", "mcq", "mixed"]),
  questionCount: z
    .number()
    .min(5, "Minimum 5 question")
    .max(30, "Maximum 30 questions"),
});

const interviewSchema = z.object({
  mode: z.literal("interview"),
  role: z.string().trim().min(2, "Role is required"),
  experienceLevel: z.enum(["fresher", "junior", "mid", "senior"]),
  techStack: z
    .array(z.string().trim().min(1, "Tech stack cannot be empty"))
    .min(1, "Enter at least one technology"),

  difficulty: z.enum(["easy", "medium", "hard"]),
  questionType: z.enum(["theory", "mcq", "mixed"]),
  questionCount: z
    .number()
    .min(5, "Minimum 5 question")
    .max(30, "Maximum 30 questions"),
});

export const createSessionSchema = z.discriminatedUnion("mode", [
  practiceSchema,
  interviewSchema,
]);
