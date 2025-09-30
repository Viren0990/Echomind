import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { redis } from "@/lib/redis"; 

const WINDOW = 60; 
const LIMIT = 20;  

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token?.uid) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  const key = `ratelimit:${token.uid}`;

  try {
    const count = await redis.incr(key);

    if (count === 1) {
      await redis.expire(key, WINDOW);
    }


    if (count > LIMIT) {
      return new NextResponse("Too Many Requests", { status: 429 });
    }
  } catch (err) {
    console.error("Rate limiting error:", err);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/createCharacter",
    "/myCharacters",
    "/myChats",
    "/profile",
    "/explore",
    "/explore/:path*",
    "/chat/:path*",
    "/createPersona",
  ],
};
