"use server"


import bcrypt from "bcrypt";
import prisma from "@/db";
import { signupSchema } from "@/types";



export async function signup(email:string, username: string, password: string){
    const saltRounds = process.env.BCRYPT_SALT_ROUNDS?? 10;
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

        return { success: true, user };
    }catch(error: any){
        if (error.code === "P2002") {
            return { success: false, message: "Email is already taken" };
        }
        console.error("Signup Error:", error);
        return { success: false, message: "An error occurred. Please try again later." };
    }
}
