"use server"


import bcrypt from "bcrypt";
import prisma from "@/db";
import { signupSchema } from "@/types";
import { getServerSession } from "next-auth";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";



export async function signup(email:string, username: string, password: string){
    const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS ?? 10);

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
    }catch(error: any){
        if (error.code === "P2002") {
            return { success: false, message: "Email is already taken" };
        }
        console.error("Signup Error:", error);
        return { success: false, message: "An error occurred. Please try again later." };
    }
}

export const createPersona = async (title:string, content:string) => {
    const session = await getServerSession(NEXT_AUTH_CONFIG);
    if (!session?.user?.id) {
        return { success: false, message: "Unauthorized" };
    }
    
    try{
        const persona = await prisma.persona.create({
            data: {
                user: { connect: { id: session.user.id } },
                name: title,
                content: content,
            },
        });

        return { success: true, message: "Persona Created", persona };
    }catch(error){
        return { success: false, message: "Error, Try again Later."}
    }
}
