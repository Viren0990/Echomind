import qwq from "@/images/qwq.png";
import { Navbar } from "@/components/Navbar";
import Image from 'next/image';
import Link from "next/link";

export const Hero = () => {
    return(
        <div className="min-h-screen relative">
            {/* Background Image */}
            <Image
                src={qwq}
                alt="Hero background"
                fill
                priority
                className="object-cover object-center"
                placeholder="blur"
                quality={90}
            />
            
            {/* Dark Overlay */}
            
            
            {/* Content Overlay */}
            <div className="relative z-10">
                <Navbar />  
                
                {/* Hero Content */}
                <div className="relative z-10 flex items-center justify-center min-h-[80vh] px-4 pt-16 md:pt-30">
                    <div className="max-w-4xl mx-auto text-center">
                        {/* Main Heading */}
                        <div className="mt-12 mb-8 md:mt-8">
                            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-slate-100 to-indigo-100 bg-clip-text text-transparent drop-shadow-2xl">
                                EchoMind
                            </h1>
                            <div className="w-32 h-1 bg-gradient-to-r from-indigo-400 to-white mx-auto rounded-full mb-8"></div>
                            <p className="text-xl md:text-2xl text-slate-200 font-light leading-relaxed max-w-3xl mx-auto drop-shadow-lg">
                                Dive into immersive conversations with AI characters in fantastical worlds. 
                                Create your story, forge relationships, and explore endless adventures.
                            </p>
                        </div>
                        
                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                            <button className="group bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-2xl hover:shadow-indigo-500/25 hover:scale-105 border-2 border-white/20">
                                <Link href="/explore" className="flex items-center justify-center gap-2">
                                    Start Your Adventure
                                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                                    </svg>
                                </Link>
                            </button>
                            <Link href="/createCharacter" className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-xl border-2 border-white/30 hover:border-white/50">
                                Create your own character
                            </Link>
                        </div>
                        
                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">1000+</div>
                                <div className="text-slate-300 text-sm md:text-base drop-shadow-md">Characters</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">50K+</div>
                                <div className="text-slate-300 text-sm md:text-base drop-shadow-md">Conversations</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">24/7</div>
                                <div className="text-slate-300 text-sm md:text-base drop-shadow-md">Available</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
