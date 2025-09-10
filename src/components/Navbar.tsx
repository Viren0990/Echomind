"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { Code2, Menu, X } from "lucide-react"; // Added X for close button
import { Button } from "@/components/ui/button";
import { useState } from "react";// Import animations
import { useRouter } from "next/navigation";
import rrr from "@/images/rrr.png"
import Image from 'next/image'



export const Navbar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);


  const navLinks = [
    { href: "/landing", label: "Home" },
    { href: "/explore", label: "Explore" },
    { href: "/myCharacters", label: "My-Characters" },
    { href: "/createCharacter", label: "Create-Characters"},
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-transparent backdrop-blur-md">
      <div className="flex h-12 items-center justify-between pr-2">
        {/* Logo */}
        <div className="inline-flex justify-center items-center">
                <div>
                    <Image
                        src={rrr}
                        alt="Authentication illustration"
                        priority
                        className="h-10 w-16 object-contain drop-shadow-lg"
                    />
                </div>
                <div>
                    <span className="text-white font-bold text-xl">EchoMind</span>
                </div>
            </div>

        
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href} className="text-white hover:font-bold transition-colors">
              {label}
            </Link>
          ))}
        </nav>

        
        <div className="hidden md:flex gap-2">
            <div>
        {status === "loading" ? (
          <p className="text-gray-500">Loading...</p>
        ) : session ? (
          <Button
            onClick={() => signOut({ callbackUrl: "/signin" })}
            className="bg-pink-500 hover:bg-pink-600 text-white"
          >
            Sign Out
          </Button>
        ) : (
          <Button
            onClick={() => signIn(undefined, { callbackUrl: "/landing" })}
            className="bg-pink-500 hover:bg-pink-600 text-white"
          >
            Sign In
          </Button>
        )}
      </div>
        </div>

        
        <div className="md:hidden">
            <Button 
            onClick={toggleMenu}
            className="border-1 border-white bg-transparent hover:bg-pink-600">
                {isMenuOpen ? <X /> : <Menu /> }
            </Button>
        </div>
    </div>

      
      
        {isMenuOpen && (
          <div>
            <nav className="flex flex-col items-center gap-4 p-4">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-white hover:font-bold transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}
              <div>
        {status === "loading" ? (
          <p className="text-gray-500">Loading...</p>
        ) : session ? (
          <Button
            onClick={() => signOut({ callbackUrl: "/signin" })}
            className="bg-pink-500 hover:bg-pink-600 text-white"
          >
            Sign Out
          </Button>
        ) : (
          <Button
            onClick={() => signIn(undefined, { callbackUrl: "/landing" })}
            className="bg-pink-500 hover:bg-pink-600 text-white"
          >
            Sign In
          </Button>
        )}
      </div>
            </nav>
          </div>
        )}
      
    </nav>
  );
};
