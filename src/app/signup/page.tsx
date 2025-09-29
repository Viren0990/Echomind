import { SignupAuth } from "@/components/signupAuth"
import rrr from "@/images/rrr.png"
import Image from 'next/image'

export default function Signup(){
    return(
        <div className="flex min-h-screen bg-slate-900">
            {/* Left Side - Hero Section */}
            <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 flex-col justify-center items-center p-12 text-white relative overflow-hidden">
                {/* Background Effects */}
                <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute top-10 left-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-16 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl"></div>
                    <div className="absolute top-1/3 right-8 w-16 h-16 bg-indigo-400/15 rounded-full blur-xl"></div>
                    <div className="absolute bottom-1/3 left-8 w-20 h-20 bg-blue-400/10 rounded-full blur-2xl"></div>
                    <div className="absolute top-1/4 left-1/3 w-12 h-12 bg-indigo-300/10 rounded-full blur-lg"></div>
                </div>
                
                <div className="max-w-md mx-auto relative z-10">
                    {/* Welcome Section */}
                    <div className="text-center mb-8">
                        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
                            Join the Adventure
                        </h1>
                        <div className="w-24 h-1 bg-gradient-to-r from-indigo-400 to-blue-500 mx-auto rounded-full mb-6 shadow-lg"></div>
                        <p className="text-lg text-slate-300 leading-relaxed">
                            Create your account and begin your journey into AI character storytelling.
                        </p>
                    </div>
                    
                    {/* Illustration Card */}
                    <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 shadow-2xl">
                        <div className="flex justify-center mb-6">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-blue-500/20 rounded-full blur-xl"></div>
                                <div className="relative border-2 border-indigo-400/40 w-52 h-52 bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-full flex items-center justify-center backdrop-blur-sm shadow-2xl">
                                    <Image
                                        src={rrr}
                                        alt="Authentication illustration"
                                        priority
                                        className="h-80 w-80 object-contain drop-shadow-2xl"
                                    />
                                </div>
                            </div>
                        </div>
                        
                        {/* Quote Section */}
                        <div className="text-center">
                            <div className="relative">
                                <svg className="absolute -top-2 -left-2 w-6 h-6 text-indigo-300/60" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                                </svg>
                                <p className="text-slate-200 italic text-lg font-medium px-4">
                                    Begin your creative storytelling adventure!
                                </p>
                                <svg className="absolute -bottom-2 -right-2 w-6 h-6 text-indigo-300/60 rotate-180" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                    
                    {/* Decorative Dots */}
                    <div className="flex justify-center mt-8 space-x-2">
                        <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                        <div className="w-2 h-2 bg-indigo-300 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                    </div>
                </div>
            </div>
            
            {/* Right Side - Form Section */}
            <div className="flex w-full md:w-1/2 p-6 min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
                <div className="max-w-lg w-full mx-auto my-auto">
                    <SignupAuth />
                </div>
            </div>
        </div>
    )
}
