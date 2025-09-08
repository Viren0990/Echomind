import Image from 'next/image';
import ass from "@/images/ass.webp"
import mm from "@/images/mm.webp"
import popop from "@/images/popop.png"
import ppp from "@/images/ppp.png"

export const CharSection = () => {
    return(
        <div className="bg-gradient-to-br from-pink-100 to-pink-50 py-20">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-pink-800 mb-6">
                            Featured Companions!
                        </h2>
                        <p className="text-lg text-pink-600 max-w-2xl mx-auto">
                            From brave knights to mysterious mages, find the perfect character for your adventure
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
    {[
        { name: "Aria", role: "Elven Mage", desc: "Wise and mysterious", image: ass},
        { name: "Kai", role: "Dragon Knight", desc: "Brave and loyal", image: mm},
        { name: "Luna", role: "Shadow Assassin", desc: "Swift and cunning", image: popop},
        { name: "Rex", role: "Royal Guard", desc: "Strong and noble", image: ppp}
    ].map((character, index) => (
        <div key={index} className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-xl border border-pink-200/50 hover:shadow-2xl transition-all duration-300 hover:scale-105 group cursor-pointer min-h-[300px] md:min-h-[300px] flex flex-col">
            <div className="w-full aspect-[4/3] md:aspect-[3/2] mb-3 md:mb-4 relative overflow-hidden rounded-lg border-2 border-pink-300/50 group-hover:border-pink-400/70 transition-all duration-300">
                <Image
                   src={character.image}
                   alt={`${character.name} - ${character.role}`}
                   fill
                   className="object-cover group-hover:scale-110 transition-transform duration-300"
                   sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                />
            </div>
            
            {/* Content Container */}
            <div className="text-center flex-1 flex flex-col">
                <div>
                    <h3 className="text-lg md:text-xl font-bold text-pink-800 group-hover:text-pink-900 transition-colors">
                        {character.name}
                    </h3>
                    <p className="text-pink-600 font-medium mb-1 md:mb-2 text-sm md:text-base">{character.role}</p>
                </div>
                <p className="text-pink-500 text-xs md:text-sm leading-relaxed">{character.desc}</p>
            </div>
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
    )
}
