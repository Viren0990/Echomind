"use client"

import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Lock, Mail, UserRoundPen, ArrowRight } from "lucide-react";
import { useState } from "react";
import { signup } from "@/app/actions/User";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const SignupAuth = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    // Validation
    if (!email || !username || !password) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      const res = await signup(email, username, password);
      if (!res.success) {
        setError(typeof res.message === "string" ? res.message : "Signup failed");
      } else {
        setSuccessMsg("Account created successfully!");
        // Wait 3 seconds then redirect
        setTimeout(() => {
          setSuccessMsg(null);
          router.push("/signin");
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col p-8 items-center justify-center space-y-6 shadow-2xl border-2 border-white/20 backdrop-blur-sm bg-white/95 rounded-2xl max-h-screen">
   
      <div className="text-center pt-4">
        <h1 className="text-slate-800 text-3xl font-bold mb-2">Welcome!</h1>
        <p className="text-slate-600 text-lg">Lets create your account and start your journey</p>
      </div>

      {successMsg && (
        <div className="fixed top-4 inset-x-0 max-w-md mx-auto bg-green-500 border border-green-400 text-green-100 px-4 py-3 rounded-xl shadow-lg animate-fade-in-out z-50">
          {successMsg}
        </div>
      )}

      {error && (
        <div className="text-red-600 text-sm text-center p-3 bg-red-50 border border-red-200 rounded-xl shadow-sm">
          {error}
        </div>
      )}

 
      <form onSubmit={handleSubmit} className="w-full space-y-6">
      
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
            className="w-full h-12 border-2 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/30 transition-all duration-200 bg-slate-50 text-slate-800 placeholder:text-slate-500 rounded-xl"
          />
        </div>

       
        <div className="space-y-3">
          <Label htmlFor="username" className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <div className="w-5 h-5 bg-slate-100 rounded-full flex items-center justify-center">
              <UserRoundPen className="w-3 h-3 text-slate-600" />
            </div>
            Username
          </Label>
          <Input
            id="username"
            type="text"
            placeholder="Choose a unique username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full h-12 border-2 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/30 transition-all duration-200 bg-slate-50 text-slate-800 placeholder:text-slate-500 rounded-xl"
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
            placeholder="Create a secure password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-12 border-2 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/30 transition-all duration-200 bg-slate-50 text-slate-800 placeholder:text-slate-500 rounded-xl"
          />
        </div>

        
        <Button
          type="submit"
          disabled={loading}
          className="w-full h-14 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-indigo-500/25 rounded-xl flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Creating Account...
            </>
          ) : (
            <>
              Create Account <ArrowRight className="w-5 h-5" />
            </>
          )}
        </Button>

       
        <div className="text-center pt-2">
          <p className="text-slate-600">
            Already have an account?{" "}
            <Link href="/signin" className="text-indigo-600 hover:text-indigo-700 font-semibold transition-colors duration-200 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
