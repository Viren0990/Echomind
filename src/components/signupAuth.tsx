"use client"

import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import { Heart, Lock, Mail, Sparkles, UserRoundPen } from "lucide-react"
import { useState } from "react"
import { signup } from "@/app/actions/User"
import Link from "next/link";
import { useRouter } from "next/navigation";



export const SignupAuth = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if(!email || !username || !password){
            setError("All fields are required.");
            setLoading(false);
            return;
        }

        try{
            const res = await signup(email, username, password);
            if (!res.success) {
                setError(typeof res.message === "string" ? res.message : "Signup failed");
            } else {
                router.push("/signin"); 
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
                <h1 className="text-pink-800 text-3xl font-bold">Welcome!</h1>
                <p className="text-pink-600 text-lg">Lets create your account!</p>
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
                        className="w-full h-12 border-2 border-pink-200 focus:border-pink-400 transition-colors duration-200 bg-white"></Input>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="username" className="text-sm font-medium text-pink-700 flex items-center gap-2"><UserRoundPen />Username</Label>
                    <Input 
                        id="username"
                        type="username"
                        placeholder="johndoe06"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full h-12 border-2 border-pink-200 focus:border-pink-400 transition-colors duration-200 bg-white"></Input>
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
                        className="w-full h-12 border-2 border-pink-200 focus:border-pink-400 transition-colors duration-200 bg-white"></Input>
                </div>
            </div>
                    <Button
                        type="submit"
                        className="mt-2 w-full h-12 bg-pink-400 hover:bg-pink-500 text-white font-semibold text-lg transition-all duration-200 hover:scale-105 hover:shadow-lg"
                    >
                        {loading ? "Signing Up..." : "Sign Up ✨"}
                    </Button>
            <p className="pb-12 text-center">Already have an account? <Link href="/signin" className="text-pink-600 hover:font-bold">
                Sign in
            </Link></p>
            </form>
        </div>
    );
}