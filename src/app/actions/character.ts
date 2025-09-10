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
        if (error) return reject(error);
        resolve(result);
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
    // Upload profile photo if provided
    let profilePhotoURL: string | null = null;
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
