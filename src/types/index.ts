import { z } from "zod";
import { TAGS } from "@/lib/tags";
export type TagName = keyof typeof TAGS;

export const signupSchema = z.object({
    email:     z.string().trim().email("Invalid email format"),
    username:  z.string()
               .trim()
               .min(3, "Username must be atleast three characters long!")
               .max(20, "Username must not exceed 20 characters")
               .regex(/^\w+$/, "Username can only contain letters, numbers, and underscores"),
    password:  z.string().min(6, "Password must be at least 6 characters"),
})

export const loginSchema = z.object({
  email: z.string().trim().email("Invalid email format"),
  password: z.string().min(6),
});


export interface CreateCharacterInput {
  title: string;
  description: string;
  personality: string;
  scenario: string;
  initialMessage: string;
  tags: TagName[];
  profilePhoto: File | null;
}