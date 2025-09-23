"use server"

import prisma from "@/db";
import { getServerSession } from "next-auth";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import OpenAI from "openai";

const openai = new OpenAI({
        baseURL: 'https://api.deepseek.com',
        apiKey: 'sk-c2f83dfe070049dd8c2ad4bae36687a7'
});

export const createChat= async (charID:string) => {
    const session = await getServerSession(NEXT_AUTH_CONFIG);
    if (!session?.user?.id) {
      return { success: false, data: "Not authenticated" };
    }

    try{
        const char = await prisma.character.findFirst({
            where: {id:charID}
        })

        if (!char) {
            return { success: false, data: "Character not found" };
        }

        const newChat = await prisma.chat.create({
            data: {
                userId: session.user.id,
                characterId: charID,
                messages: {
                    create: {
                    sender: "AI", // Character sends the first message
                    content: char.initialMessage,
                },
            },
        },
    });
    
    return { success: true, chat: newChat };
    }catch(error){
        console.error("createChat error:", error);
        return { success: false, error: "Character not found"};
    }
}

export const fetchChat = async (chatID:string) => {
    const session = await getServerSession(NEXT_AUTH_CONFIG);
    if (!session?.user?.id) {
      return { success: false, data: "Not authenticated" };
    }

    try{
        const chat = await prisma.chat.findUnique({
            where: {id:chatID},
            include: {
                messages: {
                    orderBy: { createdAt: "asc"}
                },
                character: {
                    select: {
                        id: true,
                        title: true,
                        profilePhotoURL: true,
                        personality: true,
                        scenario: true,
                    }
                }
            },
        });
       

        if (!chat || chat.userId !== session.user.id) {
            return { success: false, data: "Chat not found or unauthorized" };
        }
       

        return {
            success: true,
            data: {
                id: chat.id,
                character: {
                    id: chat.character.id,
                    name: chat.character.title,
                    profilePhotoURL: chat.character.profilePhotoURL,
                    personality: chat.character.personality,
                    scenario: chat.character.scenario,
                },
                messages: chat.messages,
            },
        };
    }catch(error){
        console.error("fetchChat error:", error);
        return { success: false, data: "Error fetching chat. Please try again." };
    }
} 


export const getAIResponse = async() => {
    
}

export const createMessage = async (userMessage:string,chatID:string) => {
    const session = await getServerSession(NEXT_AUTH_CONFIG);
    if (!session?.user?.id) {
      return { success: false, data: "Not authenticated" };
    }
    
    try{
        const message = await prisma.message.create({
            data: {
                chatId: chatID,             // Link to the correct chat
                sender: "USER",             // Because this message is from the user
                content: userMessage,       // The text the user typed
            },
        });



        return { success: true, data: message };
    }catch(error) {
        console.error("createMessage error:", error);
        return { success: false, data: "Internal server error" };
    }
}