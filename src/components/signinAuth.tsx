"use client"

import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import { Heart, Lock, Mail, Sparkles } from "lucide-react"
import { useState } from "react"
import { signIn } from 'next-auth/react'
import Link from "next/link";
import { useRouter } from "next/navigation";


export const SigninAuth = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if(!email || !password){
            setError("All fields are required.");
            setLoading(false);
            return;
        }

        try{
            const result = await signIn('credentials', {
              email,
              password,
              redirect: false
            })

            if (result?.error) {
              setError("Invalid credentials. Please try again.") // Set the error message here
            } else {
              router.push("/landing")
            }
            
        }catch(error: any){
            setError("An unexpected error occurred. Please try again.") 
            return;
        } finally {
        setLoading(false)
        }
    }

    return (
        <div className="flex flex-col p-4 items-center justify-center space-y-4 shadow-2xl border-2 border-pink-200 backdrop-blur-sm bg-pink-100/40 rounded-xl pl-6 pr-6">
            <div className="text-center pt-8">
                <div className="inline-flex items-center justify-center gap-2 mb-2 bg-pink-100 p-3 rounded-full">
                    <Heart className="w-8 h-8 text-pink-400"/>
                </div>  
                <h1 className="text-pink-800 text-3xl font-bold">Welcome Back!</h1>
                <p className="text-pink-600 text-lg">Sign in to your account</p>
            </div>
            
            <form onSubmit={handleSubmit} className="w-full space-y-4">
                {error && (
                    <div className="text-red-500 text-sm text-center p-2 bg-red-50 rounded-lg">
                        {error}
                    </div>
                )}
            <div className="w-full space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-pink-700 flex items-center gap-2"><Mail /> Email</Label>
                    <Input 
                        id="email"
                        type="email"
                        placeholder="johndoe@gmail.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-12 border-2 border-pink-200 focus:border-pink-400 transition-colors duration-200 bg-white"></Input>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium text-pink-700 flex items-center gap-2"><Lock /> Password</Label>
                    <Input 
                        id="password"
                        type="password"
                        placeholder="*********"
                        required
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                        className="h-12 border-2 border-pink-200 focus:border-pink-400 transition-colors duration-200 bg-white"></Input>
                </div>
            </div>
                    <Button
                        type="submit"
                        className="mt-2 w-full h-12 bg-pink-400 hover:bg-pink-500 text-white font-semibold text-lg transition-all duration-200 hover:scale-105 hover:shadow-lg"
                    >
                        {loading ? "Signing In..." : "Sign In ✨"}
                    </Button>
            <p className="pb-12 text-center">Dont have an account? <Link href="/signup" className="text-pink-600 hover:font-bold">
                Sign Up
            </Link></p>
            </form>
        </div>
    );
}