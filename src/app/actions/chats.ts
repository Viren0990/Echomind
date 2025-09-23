"use server"

import prisma from "@/db";
import { getServerSession } from "next-auth";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import OpenAI from "openai";
import type { ChatCompletionMessageParam } from "openai/resources/chat";



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


async function getLast30Messages(chatID: string) {
    const messages = await prisma.message.findMany({
        where: { chatId: chatID },
        orderBy: { createdAt: "desc" }, // newest first
        take: 30,
    });

    // Reverse so oldest comes first (DeepSeek expects chronological context)
    return messages.reverse();
}

// 2️⃣ Helper to fetch character details
async function getCharacterContext(chatID: string) {
    const chat = await prisma.chat.findUnique({
        where: { id: chatID },
        select: {
            character: {
                select: {
                    title: true,
                    personality: true,
                    scenario: true,
                },
            },
        },
    });
    return chat?.character;
}

// 3️⃣ Create user message and get AI response
export const createMessage = async (userMessage: string, chatID: string) => {
    console.log("A");
    const session = await getServerSession(NEXT_AUTH_CONFIG);
    if (!session?.user?.id) {
        return { success: false, data: "Not authenticated" };
    }

    try {
        console.log("A");
        // a. Save user message immediately
        const userMsg = await prisma.message.create({
            data: {
                chatId: chatID,
                sender: "USER",
                content: userMessage,
            },
        });


        // b. Prepare DeepSeek prompt
        const character = await getCharacterContext(chatID);
        const history = await getLast30Messages(chatID);

        // Create properly typed messages array
        const deepseekMessages: ChatCompletionMessageParam[] = [
            {
                role: "system",
                content: `You are roleplaying as "${character?.title}". 
Personality: ${character?.personality}.
Scenario: ${character?.scenario}.
Stay in character and respond naturally.`,
            },
            ...history.map((m): ChatCompletionMessageParam => ({
                role: m.sender === "USER" ? "user" : "assistant",
                content: m.content,
            })),
            { role: "user", content: userMessage },
        ];
          
        console.log("A");
        // c. Send to DeepSeek - FIXED: Pass the messages array directly
        const completion = await openai.chat.completions.create({
            model: "deepseek-chat",
            messages: deepseekMessages, // Pass the array directly, not wrapped in another object
        });

        const aiReply = completion.choices[0].message?.content || "…";
        

        console.log("A");
        // d. Save AI response
        const aiMsg = await prisma.message.create({
            data: {
                chatId: chatID,
                sender: "AI",
                content: aiReply,
            },
        });
        console.log(aiMsg);
        return { success: true, data: { userMsg, aiMsg } };
    } catch (error) {
        console.error("createMessage error:", error);
        return { success: false, data: "Internal server error" };
    }
};