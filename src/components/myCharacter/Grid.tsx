"use client"

import { fetchMyCharacter } from "@/app/actions/character"
import { MessageCircle, User, Sparkles } from "lucide-react";
import Link from 'next/link';
import { useEffect, useState } from "react";
import { useMyCharacterStore } from "@/store/useMyCharacterStore";

export const Grid = () => {
    const { characters, totalCount, setMyCharacters } = useMyCharacterStore(); // ✅ Use hook, not getState()
    const [loading, setLoading] = useState(!characters); // ✅ Only load if no cache
    const [error, setError] = useState<string | null>(null);
    
    const fetchMyChar = async () => {
        try { 
            setLoading(true);
            setError(null);
            const res = await fetchMyCharacter();
        
            if (!res.success || !res.characters || res.totalCount === undefined) {
                setError("Failed to load characters");
                setMyCharacters([], 0); // ✅ Use Zustand setter
            } else {
                setMyCharacters(res.characters, res.totalCount); // ✅ Use Zustand setter
            }
        } catch (error) {
            console.error("Error fetching characters:", error);
            setError("Something went wrong while fetching your characters");
            setMyCharacters([], 0); // ✅ Use Zustand setter
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!characters) { // ✅ Only fetch if not cached
            fetchMyChar();
        }
    }, [characters])

    
    const truncateDescription = (text: string, wordLimit: number = 20) => {
        const words = text.split(' ');
        if (words.length <= wordLimit) {
            return text;
        }
        return words.slice(0, wordLimit).join(' ') + '...';
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-full border-4 border-indigo-500 border-t-white animate-spin"></div>
                    <div className="text-center text-white text-2xl font-semibold tracking-wide">
                        Loading<span className="animate-pulse">...</span>
                    </div>
                    <div className="text-slate-300 text-sm">
                        Please wait while we fetch your characters!
                    </div>
                </div>
            </div>
        );
    }

   
    if (error) {
        return (
            <div className="text-center py-16">
                <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-red-400/50">
                    <Sparkles className="w-12 h-12 text-red-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Error Loading Characters</h3>
                <p className="text-slate-300 text-lg max-w-md mx-auto mb-6">
                    {error}. Please try again later.
                </p>
                <button 
                    onClick={fetchMyChar}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 hover:scale-105"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return(
        <div>
            <div className="text-center pt-4 mb-8">
                <p className="text-slate-300 text-lg max-w-2xl mx-auto"> 
                    {totalCount === 0 
                        ? "You haven't created any characters yet. Start building your first character to begin your creative journey!"
                        : `You have successfully created and managed ${totalCount} character${totalCount !== 1 ? 's' : ''} in your collection. ${totalCount > 5 ? 'Impressive portfolio!' : 'Keep building your roster!'}`
                    }
                </p>
            </div>

            <div className="max-w-7xl mx-auto">
                {totalCount === 0 ? (
                    <div className="text-center py-16">
                        <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                            <Sparkles className="w-12 h-12 text-white/60" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">No Characters Created Yet</h3>
                        <p className="text-slate-300 text-lg max-w-md mx-auto mb-6">
                            Ready to bring your imagination to life? Create your first AI character!
                        </p>
                        <Link 
                            href="/create"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 hover:scale-105"
                        >
                            <Sparkles className="w-5 h-5" />
                            Create Your First Character
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {characters?.map((character: any) => (
                            <Link 
                                key={character.id}
                                href={`/explore/${character.id}`}
                                className="group block"
                            >
                                <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-white/20 shadow-2xl hover:shadow-indigo-500/20 transition-all duration-300 hover:scale-105 cursor-pointer flex flex-col h-full hover:bg-white">
                                    
                                    <div className="relative w-full h-48 rounded-t-2xl overflow-hidden flex-shrink-0">
                                        <img
                                            src={character.profilePhotoURL}
                                            alt={character.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>

                                    <div className="p-4 flex flex-col flex-grow">
                                        
                                        <h3 className="text-lg font-bold text-slate-800 mb-2 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                                            {character.title}
                                        </h3>

                                        
                                        <div className="flex-grow mb-3">
                                            <p className="text-slate-600 text-sm leading-relaxed h-10 overflow-hidden">
                                                {truncateDescription(character.description, 20)}
                                            </p>
                                        </div>

            
                                        {/* Footer Info */}
                                        <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-200 mt-auto">
                                            <div className="flex items-center gap-1">
                                                <User className="w-3 h-3" />
                                                <span className="truncate">{character.user?.username || 'You'}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <MessageCircle className="w-3 h-3" />
                                                <span>{character._count?.chats || 0}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                
                {totalCount > 0 && (
                    <div className="text-center mt-12">
                        <Link 
                            href="/createCharacter"
                            className="inline-flex items-center gap-2 bg-white/95 hover:bg-white text-slate-700 font-semibold px-6 py-3 rounded-xl shadow-2xl hover:shadow-indigo-500/20 transition-all duration-300 hover:scale-105 border border-white/50"
                        >
                            <Sparkles className="w-5 h-5" />
                            Create Another Character
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}
