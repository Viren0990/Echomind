import qwq from "@/images/qwq.png";
import { Navbar } from "@/components/Navbar";
import Image from 'next/image';

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
            
            {/* Content Overlay */}
            <div className="relative z-10">
                <Navbar />  
                
                {/* Hero Content */}
                <div className="relative z-10 flex items-center justify-center min-h-[80vh] px-4 pt-16 md:pt-30">
                    <div className="max-w-4xl mx-auto text-center">
                        {/* Your existing content */}
                        <div className="mt-12 mb-8 md:mt-8">
                            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-pink-100 to-pink-200 bg-clip-text text-transparent drop-shadow-lg">
                                EchoMind
                            </h1>
                            <div className="w-32 h-1 bg-gradient-to-r from-pink-300 to-white mx-auto rounded-full mb-8"></div>
                            <p className="text-xl md:text-2xl text-white/90 font-light leading-relaxed max-w-3xl mx-auto drop-shadow-md">
                                Dive into immersive conversations with AI characters in fantastical worlds. 
                                Create your story, forge relationships, and explore endless adventures.
                            </p>
                        </div>
                        
                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                            <button className="group bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 border-2 border-white/20">
                                <span className="flex items-center justify-center gap-2">
                                    Start Your Adventure
                                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                                    </svg>
                                </span>
                            </button>
                            <button className="bg-pink-600/20 backdrop-blur-sm hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-xl border-2 border-white/30 hover:border-white/50">
                                Explore Characters
                            </button>
                        </div>
                        
                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-white mb-2 [text-shadow:_1px_1px_0_black,_-1px_-1px_0_black,_1px_-1px_0_black,_-1px_1px_0_black]">1000+</div>
                                <div className="text-white text-sm md:text-base [text-shadow:_1px_1px_0_black,_-1px_-1px_0_black,_1px_-1px_0_black,_-1px_1px_0_black]">Characters</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-white mb-2 [text-shadow:_1px_1px_0_black,_-1px_-1px_0_black,_1px_-1px_0_black,_-1px_1px_0_black]">50K+</div>
                                <div className="text-white text-sm md:text-base [text-shadow:_1px_1px_0_black,_-1px_-1px_0_black,_1px_-1px_0_black,_-1px_1px_0_black]">Conversations</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-white mb-2 [text-shadow:_1px_1px_0_black,_-1px_-1px_0_black,_1px_-1px_0_black,_-1px_1px_0_black]">24/7</div>
                                <div className="text-white text-sm md:text-base [text-shadow:_1px_1px_0_black,_-1px_-1px_0_black,_1px_-1px_0_black,_-1px_1px_0_black]">Available</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            
    )
}