"use server";

import { TAGS } from "@/lib/tags";
import prisma from "@/db";
import cloudinary from "@/lib/cloudinary";
import { CreateCharacterInput, TagName } from "@/types";
import { getServerSession } from "next-auth";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";

interface CloudinaryUploadResult {
  secure_url: string;
}

const uploadImage = async (file: File): Promise<CloudinaryUploadResult> => {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise<CloudinaryUploadResult>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "characters" },
      (error, result) => {
        if (error) return reject("error");
        resolve(result as CloudinaryUploadResult);
      }
    );

    uploadStream.end(buffer);
  });
};


export const uploadCharacter = async (data: CreateCharacterInput) => {
  const session = await getServerSession(NEXT_AUTH_CONFIG);
  if (!session?.user?.id) {
    return { success: false, message: "Unauthorized" };
  }

  try {
    let profilePhotoURL: string = "";
    if (data.profilePhoto) {
      const uploadResult = await uploadImage(data.profilePhoto);
      profilePhotoURL = uploadResult.secure_url;
    }

    if (!data.tags.every(tag => TAGS[tag])) {
      throw new Error("Invalid tag detected");
    }

    const tagConnections = data.tags.map((tag: TagName) => ({
      id: TAGS[tag],
    }));

  
    const character = await prisma.character.create({
      data: {
        title: data.title,
        description: data.description,
        profilePhotoURL,
        personality: data.personality,
        scenario: data.scenario,
        initialMessage: data.initialMessage,
        user: { connect: { id: session.user.id } },
        tags: { connect: tagConnections },
      },
    });

    return { success: true, character };
  } catch (error) {
    console.error("Upload Character Error:", error);
    return {
      success: false,
      message: "An error occurred while creating the character.",
    };
  }
};

export async function fetchAllCharacters(page: number, limit: number) {
  try {
    const totalCount = await prisma.character.count();
    
    const characters = await prisma.character.findMany({
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      select:{
          id: true,
          title: true,
          profilePhotoURL: true,
          description: true,
          createdAt: true,
          updatedAt: true,
          creator: true,
          user: {select: {id: true, username: true}},
          _count: {select: {chats:true}},
      },
      
    });

    const formatted = characters.map(({ _count, ...rest }) => ({
  ...rest,
  chatCount: _count?.chats ?? 0,
}));

    return {
      success: true,
      characters: formatted,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
        totalCount,
        hasNextPage: page < Math.ceil(totalCount / limit),
        hasPrevPage: page > 1,
      }
    };
  } catch (error) {
    console.error("Error fetching characters:", error);
    return { 
      success: false, 
      characters: [],
      pagination: {
        currentPage: 1,
        totalPages: 0,
        totalCount: 0,
        hasNextPage: false,
        hasPrevPage: false,
      }
    };
  }
}



export const fetchCharacter = async (charId: string) => {
  try {
    
    const session = await getServerSession(NEXT_AUTH_CONFIG);
    if (!session?.user?.id) {
      return { success: false, data: "Not authenticated" };
    }
    const userId = session.user.id;

    const character = await prisma.character.findUnique({
      where: { id: charId },
      select: {
          id: true,
          title: true,
          profilePhotoURL: true,
          description: true,
          createdAt: true,
          updatedAt: true,
          creator: true,

          user: {select: {id: true, username: true}},
          tags: {select: {id: true, name: true}},
          _count: {select: {chats:true}},
        }
    });

    if (!character) {
      return { success: false, data: "Character not found" };
    }

    
    const existingChat = await prisma.chat.findFirst({
      where: {
        userId,
        characterId: charId,
      },
      select: { id: true },
    });

    return {
      success: true,
      data: {
        ...character,
        existingChatId: existingChat?.id ?? null, 
      },
    };
  } catch (error) {
    console.error("fetchCharacter error:", error);
    return {
      success: false,
      data: "Error in fetching character. Please try again later!",
    };
  }
};

export const fetchMyCharacter = async () =>{
  const session = await getServerSession(NEXT_AUTH_CONFIG);
  console.log("DB URL:", process.env.DATABASE_URL?.split("@")[1]);
  if (!session?.user?.id) {
    return { success: false, message: "Unauthorized" };
  }
  try{

      const totalCount = await prisma.character.count({
        where: {creator :session?.user?.id}
      });
      
      const res = await prisma.character.findMany({
        orderBy: { createdAt: "desc" },
        where: {creator: session?.user?.id},
        select: {
          id: true,
          title: true,
          profilePhotoURL: true,
          description: true,
          createdAt: true,
          updatedAt: true,
          creator: true,

          user: {select: {id: true, username: true}},
          tags: {select: {id: true, name: true}},
          _count: {select: {chats:true}},
        }
      });

      

      return {success: true, characters: res, totalCount}
  }catch(error){
      console.log(error);
      return {success: false, chracters: [], totalCount: 0}
  }
}

export const deleteChat = async (chatId: string) => {
    const session = await getServerSession(NEXT_AUTH_CONFIG)
    
    if (!session?.user?.id) {
        return { success: false, message: "Not authenticated" }
    }

    try {
        const chat = await prisma.chat.findFirst({
            where: {
                id: chatId,
                userId: session.user.id
            }
        })

        if (!chat) {
            return { success: false, message: "Chat not found or unauthorized" }
        }

        await prisma.chat.delete({
            where: {
                id: chatId
            }
        })

        return { success: true, message: "Chat deleted successfully" }
    } catch (error) {
        console.error("Delete chat error:", error)
        return { success: false, message: "Failed to delete chat" }
    }
}