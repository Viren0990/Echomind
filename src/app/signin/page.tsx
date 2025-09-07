import { SigninAuth } from "@/components/signinAuth"
import rrr from "@/images/rrr.png"
import Image from 'next/image'

export default function Signin(){
    return(
        <div className="flex max-h-screen">
            <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-pink-500 via-pink-600 to-pink-700 flex-col justify-center items-center p-12 text-white relative overflow-hidden">
                           
                            <div className="absolute top-0 left-0 w-full h-full">
                                <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
                                <div className="absolute bottom-20 right-16 w-24 h-24 bg-pink-300/20 rounded-full blur-lg"></div>
                                <div className="absolute top-1/3 right-8 w-16 h-16 bg-white/15 rounded-full blur-md"></div>
                            </div>
                            
                            <div className="max-w-md mx-auto relative z-10">
                               
                                <div className="text-center mb-8">
                                    <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-pink-100 bg-clip-text text-transparent">
                                        Welcome Back
                                    </h1>
                                    <div className="w-24 h-1 bg-gradient-to-r from-white to-pink-200 mx-auto rounded-full mb-6"></div>
                                    <p className="text-lg text-pink-50 leading-relaxed">
                                        Create your account and begin your journey with us.
                                    </p>
                                </div>
                                
                                
                                <div className="bg-white/15 backdrop-blur-sm p-8 rounded-2xl border border-white/20 shadow-2xl">
                                    <div className="flex justify-center mb-6">
                                       
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-pink-200/30 rounded-full blur-sm"></div>
                                            <div className="relative border-2 border-white/40 w-52 h-52 bg-gradient-to-br from-white/25 to-pink-100/25 rounded-full flex items-center justify-center backdrop-blur-sm shadow-xl">
                                                <Image
                                                    src={rrr}
                                                    alt="Authentication illustration"
                                                    priority
                                                    className="h-80 w-80 object-contain drop-shadow-lg"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    
                                    
                                    <div className="text-center">
                                        <div className="relative">
                                            <svg className="absolute -top-2 -left-2 w-6 h-6 text-pink-200/60" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                                            </svg>
                                            <p className="text-pink-50 italic text-lg font-medium px-4">
                                                Start roleplaying!
                                            </p>
                                            <svg className="absolute -bottom-2 -right-2 w-6 h-6 text-pink-200/60 rotate-180" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                
                                
                                <div className="flex justify-center mt-8 space-x-2">
                                    <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                                    <div className="w-2 h-2 bg-pink-200/80 rounded-full"></div>
                                    <div className="w-2 h-2 bg-white/40 rounded-full"></div>
                                </div>
                            </div>
                        </div>
            <div className="flex w-full md:w-1/2 p-6 min-h-screen">
                <div className="max-w-md w-full mx-auto my-auto">
                    <SigninAuth />
                </div>
            </div>
        </div>
    )
}