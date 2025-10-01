"use server"


import bcrypt from "bcrypt";
import prisma from "@/db";
import { signupSchema, persona } from "@/types";
import { getServerSession } from "next-auth";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";





export async function signup(email:string, username: string, password: string){
    
    const validated = signupSchema.safeParse({email,username,password});
    if (!validated.success) {
        return { success: false, message: validated.error.errors[0].message };
    }

    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                email,
                username,
                password: hashedPassword,
            }
        })

        return { 
            success: true, 
            user: { id: user.id, email: user.email, username: user.username } 
        };
    }catch(error){
        
        console.error("Signup Error:", error);
        return { success: false, message: "An error occurred. Please try again later." };
    }
}

export const createPersona = async (data: persona) => {
    const session = await getServerSession(NEXT_AUTH_CONFIG);
    if (!session?.user?.id) {
        return { success: false, message: "Unauthorized" };
    }
    
    try{
        const persona = await prisma.persona.create({
            data: {
                user: { connect: { id: session.user.id } },
                name: data.name,
                content: data.content,
            },
        });

        return { success: true, message: "Persona Created", persona };
    }catch(error){
       console.error("Fetch User Details Error:", error);
        return { success: false, message: "Error, Try again Later."}
    }
}


export const fetchUserDetails = async () => {
  const session = await getServerSession(NEXT_AUTH_CONFIG);
  if (!session?.user?.id) {
    return { success: false, message: "Unauthorized" };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        email: true,
        username: true,
        createdAt: true,
        personas: {
          select: {
            id: true,
            name: true,
            content: true,
            createdAt: true,
          },
        },
      },
    });

    if (!user) {
      return { success: false, message: "User not found" };
    }

    return { success: true, user };
  } catch (error) {
    console.error("Fetch User Details Error:", error);
    return { success: false, message: "An error occurred. Please try again later." };
  }
};
