import { Navbar } from "@/components/Navbar";
import qwq from "@/images/qwq.png";
import Head from "next/head";

export default function Landing(){
    return(
        <div className="min-h-screen">
            <Head>
                <link rel="preload" as="image" href={qwq.src} />
            </Head>
            
            <div 
                className="min-h-screen bg-cover bg-center bg-no-repeat relative"
                style={{ backgroundImage: `url(${qwq.src})` }}
            >  
            <Navbar />  
                {/* Hero Content */}
                <div className="relative z-10 flex items-center justify-center min-h-[80vh] px-4 pt-16 md:pt-30">
                    <div className="max-w-4xl mx-auto text-center">
                        {/* Main Heading */}
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
            
            
            {/* Character Showcase Section */}
            <div className="bg-gradient-to-br from-pink-100 to-pink-50 py-20">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-pink-800 mb-6">
                            Meet Your Companions
                        </h2>
                        <p className="text-lg text-pink-600 max-w-2xl mx-auto">
                            From brave knights to mysterious mages, find the perfect character for your adventure
                        </p>
                    </div>
                    
                    <div className="grid md:grid-cols-4 gap-6">
                        {/* Character Cards - You can replace these with actual character images */}
                        {[
                            { name: "Aria", role: "Elven Mage", desc: "Wise and mysterious" },
                            { name: "Kai", role: "Dragon Knight", desc: "Brave and loyal" },
                            { name: "Luna", role: "Shadow Assassin", desc: "Swift and cunning" },
                            { name: "Rex", role: "Royal Guard", desc: "Strong and noble" }
                        ].map((character, index) => (
                            <div key={index} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-pink-200/50 hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
                                {/* Character Avatar Placeholder */}
                                <div className="w-24 h-24 bg-gradient-to-br from-pink-300 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <span className="text-white font-bold text-2xl">{character.name[0]}</span>
                                </div>
                                <h3 className="text-xl font-bold text-pink-800 mb-2">{character.name}</h3>
                                <p className="text-pink-600 font-medium mb-2">{character.role}</p>
                                <p className="text-pink-500 text-sm">{character.desc}</p>
                            </div>
                        ))}
                    </div>
                    
                    <div className="text-center mt-12">
                        <button className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-semibold py-3 px-8 rounded-full text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105">
                            View All Characters
                        </button>
                    </div>
                </div>
            </div>
            
            {/* CTA Section */}
            <div className="bg-gradient-to-r from-pink-600 via-pink-500 to-pink-600 py-20 relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute inset-0">
                    <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
                    <div className="absolute bottom-16 right-16 w-24 h-24 bg-pink-300/20 rounded-full blur-lg"></div>
                    <div className="absolute top-1/3 right-8 w-16 h-16 bg-white/15 rounded-full blur-md"></div>
                </div>
                
                <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Ready to Begin?
                    </h2>
                    <p className="text-xl text-pink-100 mb-8 max-w-2xl mx-auto">
                        Join thousands of adventurers already exploring infinite worlds and creating unforgettable stories.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-white text-pink-600 hover:bg-pink-50 font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105">
                            Create Free Account
                        </button>
                        <button className="border-2 border-white text-white hover:bg-white hover:text-pink-600 font-bold py-4 px-8 rounded-full text-lg transition-all duration-300">
                            Learn More
                        </button>
                    </div>
                </div>
            </div>
            
            {/* Footer */}
            <footer className="bg-pink-900 text-pink-100 py-6">
                <div className="max-w-6xl mx-auto px-4">   
                    <div className="border-t border-pink-800 mt-2 pt-2 text-center text-pink-300">
                        <p>&copy; 2025 EchoMind. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
