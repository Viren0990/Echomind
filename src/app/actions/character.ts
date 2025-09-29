"use server";

import { TAGS } from "@/lib/tags";
import prisma from "@/db";
import cloudinary from "@/lib/cloudinary";
import { CreateCharacterInput, TagName } from "@/types";
import { getServerSession } from "next-auth";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";

const uploadImage = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise<any>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "characters" },
      (error, result) => {
        if (error) return reject("error");
        resolve(result);
      }
    );

    uploadStream.end(buffer);
  });
};

export const uploadCharacter = async (data: CreateCharacterInput) => {
  const session = await getServerSession(NEXT_AUTH_CONFIG);
  console.log("DB URL:", process.env.DATABASE_URL?.split("@")[1]);
  if (!session?.user?.id) {
    return { success: false, message: "Unauthorized" };
  }

  try {
    // Upload profile photo if provided
    let profilePhotoURL: string = "";
    if (data.profilePhoto) {
      const uploadResult = await uploadImage(data.profilePhoto);
      profilePhotoURL = uploadResult.secure_url;
    }

    if (!data.tags.every(tag => TAGS[tag])) {
  throw new Error("Invalid tag detected");
}

    // Map TagName[] to tag IDs from TAGS
    const tagConnections = data.tags.map((tag: TagName) => ({
      id: TAGS[tag],
    }));

    // Create character
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
  } catch (error: any) {
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
      include: {
        user: { select: { id: true, username: true } },
        tags: { select: { id: true, name: true } },
        _count: { select: { chats: true } },
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
    // 1️⃣ Get the signed-in user
    const session = await getServerSession(NEXT_AUTH_CONFIG);
    if (!session?.user?.id) {
      return { success: false, data: "Not authenticated" };
    }
    const userId = session.user.id;

    // 2️⃣ Fetch character details
    const character = await prisma.character.findUnique({
      where: { id: charId },
      include: {
        user: { select: { id: true, username: true } },
        tags: { select: { id: true, name: true } },
        _count: { select: { chats: true } },
      },
    });

    if (!character) {
      return { success: false, data: "Character not found" };
    }

    // 3️⃣ Check if a chat already exists between this user & character
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
        existingChatId: existingChat?.id ?? null, // ✅ add chat id if present
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
      return {success: false, chracters: [], totalCount: 0}
  }
}