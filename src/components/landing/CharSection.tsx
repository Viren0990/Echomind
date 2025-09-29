import Image from 'next/image';
import ass from "@/images/ass.webp"
import mm from "@/images/mm.webp"
import popop from "@/images/popop.webp"
import ppp from "@/images/ppp.webp"
import Link from 'next/link';

export const CharSection = () => {
    return(
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 py-20">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
                        Featured Companions!
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        From brave knights to mysterious mages, find the perfect character for your adventure
                    </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        { name: "Lilith", role: "Vampire Empress", desc: "'As the last leader of a broken humanity stands alone before the throne of their species' destroyer. Surrounded by overwhelming demonic power with extinction looming, you have one final chance to speak....", image: ass},
                        { name: "Truth seeing king | Enki-idu", role: "Enki-idu", desc: "Description| ｆａｎｔａｓｙ Enki-idu hates parties. No, not just because he is an introvert or because it's littered with syncopants-", image: mm},
                        { name: "Aeron", role: "Injured warrior", desc: "✩ || FANTASY || you find an injured knight passed out in the woods. Aeron lived a long life, although the last of it was tainted in dishonor. He was a knight at heart, and nothing would ever change that....", image: popop},
                        { name: "Yumiko Miura", role: "Oregairu protag", desc: "Yumiko Miura is a little bit of tsundere —a stylish, sharp-tongued blonde who rules Sobu High's social hierarchy with effortless coolness. Beneath her prickly exterior lies a fiercely loyal friend....", image: ppp}
                    ].map((character, index) => (
                        <div key={index} className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-xl border border-slate-200 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 hover:scale-105 group cursor-pointer min-h-[300px] md:min-h-[300px] flex flex-col">
                            <div className="w-full aspect-[4/3] md:aspect-[3/2] mb-3 md:mb-4 relative overflow-hidden rounded-lg border-2 border-slate-200 group-hover:border-indigo-300 transition-all duration-300">
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
                                    <h3 className="text-lg md:text-xl font-bold text-slate-800 group-hover:text-indigo-700 transition-colors">
                                        {character.name}
                                    </h3>
                                    <p className="text-slate-600 font-medium mb-1 md:mb-2 text-sm md:text-base">{character.role}</p>
                                </div>
                                <p className="text-slate-500 text-xs md:text-sm leading-relaxed">{character.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="text-center mt-12">
                    <Link href="/explore" className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-full text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-indigo-500/25 hover:scale-105">
                        View All Characters
                    </Link>
                </div>
            </div>
        </div>
    )
}
