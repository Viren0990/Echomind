"use client"

import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import { Heart, Lock, Mail,  ArrowRight } from "lucide-react"
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
              setError("Invalid credentials. Please try again.")
            } else {
              router.push("/landing")
            }
            
        }catch(error){
            console.log(error);
            setError("An unexpected error occurred. Please try again.") 
            return;
        } finally {
        setLoading(false)
        }
    }

    return (
        <div className="flex flex-col p-8 items-center justify-center space-y-6 shadow-2xl border-2 border-white/20 backdrop-blur-sm bg-white/95 rounded-2xl">
           
            <div className="text-center pt-4">
                <div className="inline-flex items-center justify-center gap-2 mb-4 bg-gradient-to-br from-indigo-500 to-blue-600 p-4 rounded-full shadow-lg">
                    <Heart className="w-8 h-8 text-white"/>
                </div>  
                <h1 className="text-slate-800 text-3xl font-bold mb-2">Welcome Back!</h1>
                <p className="text-slate-600 text-lg">Sign in to continue your adventure</p>
            </div>
            
            <form onSubmit={handleSubmit} className="w-full space-y-6">
                {/* Error Message */}
                {error && (
                    <div className="text-red-600 text-sm text-center p-3 bg-red-50 border border-red-200 rounded-xl shadow-sm">
                        {error}
                    </div>
                )}

                <div className="w-full space-y-5">
                    <div className="space-y-3">
                        <Label htmlFor="email" className="text-sm font-medium text-slate-700 flex items-center gap-2">
                            <div className="w-5 h-5 bg-slate-100 rounded-full flex items-center justify-center">
                                <Mail className="w-3 h-3 text-slate-600" />
                            </div>
                            Email Address
                        </Label>
                        <Input 
                            id="email"
                            type="email"
                            placeholder="Enter your email address"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="h-12 border-2 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/30 transition-all duration-200 bg-slate-50 text-slate-800 placeholder:text-slate-500 rounded-xl"
                        />
                    </div>

                    <div className="space-y-3">
                        <Label htmlFor="password" className="text-sm font-medium text-slate-700 flex items-center gap-2">
                            <div className="w-5 h-5 bg-slate-100 rounded-full flex items-center justify-center">
                                <Lock className="w-3 h-3 text-slate-600" />
                            </div>
                            Password
                        </Label>
                        <Input 
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            required
                            value={password}
                            onChange={(e)=> setPassword(e.target.value)}
                            className="h-12 border-2 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/30 transition-all duration-200 bg-slate-50 text-slate-800 placeholder:text-slate-500 rounded-xl"
                        />
                    </div>
                </div>

                <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-14 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-indigo-500/25 rounded-xl flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Signing In...
                        </>
                    ) : (
                        <>
                            Sign In
                            <ArrowRight className="w-5 h-5" />
                        </>
                    )}
                </Button>

         
                <div className="text-center pt-4 pb-2">
                    <p className="text-slate-600">
                        Dont have an account?{" "}
                        <Link 
                            href="/signup" 
                            className="text-indigo-600 hover:text-indigo-700 font-semibold transition-colors duration-200 hover:underline"
                        >
                            Create Account
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
}
