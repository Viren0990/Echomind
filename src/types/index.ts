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

export interface persona {
  name: string,
  content: string,
}

export interface CharacterData {
  id: string;
  title: string;
  description: string;
  personality: string;
  scenario: string;
  initialMessage: string;
  profilePhotoURL: string; // ✅ match Prisma field exactly
  user: { id: string; username: string };
  tags: { id: string; name: string }[];
   _count: { chats: number };
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
    id: string
    content: string
    sender: "USER" | "AI"
    createdAt: Date
    chatId?: string
}

export interface ChatData {
    id: string
    character: {
        profilePhotoURL: string
        id: string
        name: string
        personality: string
        scenario: string
    }
    messages: Message[]
}

export interface Char {
    personality: string,
    scenario: string
}

export type MessageHistory = { sender: "USER" | "AI"; content: string };
