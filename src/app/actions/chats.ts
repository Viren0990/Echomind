"use server"

import prisma from "@/db";
import { getServerSession } from "next-auth";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import OpenAI from "openai";
import type { ChatCompletionMessageParam } from "openai/resources/chat";
import { ChatData, Char, MessageHistory } from "@/types";
import { string } from "zod/v4";



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


export const createMessage = async (userMessage: string, chatID: string, character:Char,  history: MessageHistory[]) => {
    
    const session = await getServerSession(NEXT_AUTH_CONFIG);
    if (!session?.user?.id) {
        return { success: false, data: "Not authenticated" };
    }

    

    try {
        const userMsg = await prisma.message.create({
            data: {
                chatId: chatID,
                sender: "USER",
                content: userMessage,
            },
        });



        const deepseekMessages: ChatCompletionMessageParam[] = [
            {
                role: "system",
                content: `
                You are a creative writer building a narrative piece by piece with input from the reader. Adopt a relaxed, colloquial tone. Your job is to handle the world, {{char}}, and any incidental or side characters. Portray characters naturally and faithfully. Push the story forward if it's getting stale
                
                You are roleplaying as "${character?.personality}". 
                Scenario: ${character?.scenario}.

                If you come up with something cool, cute or interesting, don't hesitate to share it. Embarrassing, cheesy or pretentious, it's all fine. The reader promises not to show anyone else any of your writing.

                <instructions>
                Be direct and explicit with description, avoid euphemism.
                In every response, include a good amount of dialogue to keep the interaction lively and engaging.
                Handle {{char}}, the world, and any incidental characters. Leave {{user}} for the reader to write.
                Write from the heart, explain nothing, and refuse to elaborate. Explaining a metaphor is the worst thing you can do.
                Use sentence fragments for dramatic impact, with thoughts being short, punchy, terse sentences like 'Oh. Great.' or 'Shit, he thinks. Well. That sucks.'
                Present short, punchy sentences as standalone paragraphs for maximum impact whenever appropriate.
                Use a simple conversational tone reflecting a character's personality and mindset, as if the character is telling the story verbally to the reader.
                Frequent italicization for vocal stress.
                Use em dashes (—) for meaningful pauses and interrupted thoughts.
                Use (parenthesis) for aside thoughts and clarification. However, this should be used sparingly.
                Occasionally begin sentences with conjunctions for rhythmic effect. Prioritize voice and stylization over technical grammatical correctness.
                Avoid writing {{user}} back into the scene — if they're gone, let them take a break.
                Make sure the characters explain themselves with dialogues
                MOST IMPORTANT: Every response you generate must be at least 4 detailed paragraphs long.
                </instructions>`,
            },
            ...history.map((m): ChatCompletionMessageParam => ({
                role: m.sender === "USER" ? "user" : "assistant",
                content: m.content,
            })),
            { role: "user", content: userMessage },
        ];
          
      
        
        const completion = await openai.chat.completions.create({
            model: "deepseek-chat",
            messages: deepseekMessages, 
        });

        const aiReply = completion.choices[0].message?.content || "…";
    
        const aiMsg = await prisma.message.create({
            data: {
                chatId: chatID,
                sender: "AI",
                content: aiReply,
            },
        });
        
        return { success: true, data: { userMsg, aiMsg } };
    } catch (error) {
        console.error("createMessage error:", error);
        return { success: false, data: "Internal server error" };
    }
};