import { fetchCharacter } from "@/app/actions/character";
import { Navbar } from "@/components/Navbar";
import { MessageCircle, User, Calendar, Heart, Tag } from "lucide-react";
import { CharacterData } from "@/types";
import Link from 'next/link';
import { ChatButton } from "@/components/explore/[id]/chatButton";
import { BackButton } from "@/components/explore/[id]/BackButton";

export default async function Character({ params }: Readonly<{ params: { id: string } }>) {
    const { id } = await params;
    let character:CharacterData;
    let  chatId;
    
    try {
        const result = await fetchCharacter(id);
        if (result.success && result.data && typeof result.data !== "string") {
            character = result.data;
            chatId = result.data.existingChatId;
        } else {
            return (
                <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
                    <div className="bg-white/95 rounded-2xl p-8 text-center shadow-2xl">
                        <h1 className="text-2xl font-bold text-slate-800 mb-4">Character not found!</h1>
                        <p className="text-slate-600">The character you're looking for doesn't exist.</p>
                    </div>
                </div>
            );
        }
    } catch (error: any) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
                <div className="bg-white/95 rounded-2xl p-8 text-center shadow-2xl">
                    <h1 className="text-2xl font-bold text-slate-800 mb-4">Server Error!</h1>
                    <p className="text-slate-600">Please try again later.</p>
                </div>
            </div>
        );
    }

    // Format dates
    const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};


    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <BackButton />
            
            <div className="relative h-[75vh] overflow-hidden">
                {/* Background Image - Fixed cropping issues */}
                <div className="absolute inset-0">
                    <img
                        src={character.profilePhotoURL}
                        alt={character.title}
                        className="w-full h-full object-cover object-center"
                        style={{
                            minWidth: '100%',
                            minHeight: '100%'
                        }}
                    />
              
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-slate-900/60 to-slate-900/90"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-indigo-900/20"></div>
                </div>
                
               
                <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex flex-col md:flex-row md:items-end gap-6">
                            <div className="flex-shrink-0 mx-auto md:mx-0">
                                <div className="w-36 h-36 md:w-40 md:h-40 rounded-3xl overflow-hidden border-4 border-white/80 shadow-2xl backdrop-blur-sm">
                                    <img
                                        src={character.profilePhotoURL}
                                        alt={character.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                            
                            
                            <div className="flex-grow text-center md:text-left text-white pb-2">
                                <h1 className="text-4xl md:text-6xl font-black mb-4 drop-shadow-2xl bg-gradient-to-r from-white via-purple-100 to-indigo-100 bg-clip-text text-transparent">
                                    {character.title}
                                </h1>
                                <div className="flex flex-wrap gap-3 mb-6 justify-center md:justify-start">
                                    {character.tags?.map((tag: any) => (
                                        <span
                                            key={tag.id}
                                            className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-semibold border border-white/30 shadow-lg hover:bg-white/30 transition-all duration-300"
                                        >
                                            {tag.name}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 text-white/90 text-sm font-medium justify-center md:justify-start">
                                    <div className="flex items-center gap-2 justify-center md:justify-start">
                                        <User className="w-4 h-4" />
                                        <span>by {character.user?.username}</span>
                                    </div>
                                    <div className="flex items-center gap-2 justify-center md:justify-start">
                                        <MessageCircle className="w-4 h-4" />
                                        <span>{character._count?.chats || 0} chats</span>
                                    </div>
                                    <div className="flex items-center gap-2 justify-center md:justify-start">
                                        <Calendar className="w-4 h-4" />
                                        <span>{formatDate(character.createdAt)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            
            <div className="bg-gradient-to-b from-slate-900 to-slate-800 min-h-[25vh]">
                <div className="max-w-6xl mx-auto px-8 py-16">
                 
                    <div className="flex flex-col sm:flex-row gap-4 mb-12">
                        
                        <ChatButton characterId={character.id}
                            existingChatId={chatId}/>
                        <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white text-xl font-semibold py-5 px-8 rounded-2xl border border-white/20 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 shadow-xl">
                            <Heart className="w-6 h-6" />
                            Add to Favorites
                        </button>
                    </div>
                    
                
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/10">
                            <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                                    <User className="w-4 h-4 text-white" />
                                </div>
                                Character Details
                            </h3>
                            <div className="space-y-4 text-slate-700">
                                <div className="flex justify-between items-center py-2 border-b border-slate-200">
                                    <span className="font-semibold">Creator:</span>
                                    <span className="text-purple-600 font-medium">{character.user?.username}</span>
                                </div>
                                <div className="text-center">
                                    <span className="text-center font-bold">Description</span>
                                    <p>{character.description}</p>
                                </div>
                                
                            </div>
                        </div>
                        
                        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/10">
                            <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                                <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                                    <Tag className="w-4 h-4 text-white" />
                                </div>
                                Categories
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {character.tags?.map((tag: any) => (
                                    <span
                                        key={tag.id}
                                        className="bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-800 px-4 py-3 rounded-xl text-sm font-bold border border-purple-200 hover:from-purple-200 hover:to-indigo-200 transition-all duration-300 shadow-md"
                                    >
                                        {tag.name}
                                    </span>
                                ))}
                            </div>
                            {(!character.tags || character.tags.length === 0) && (
                                <div className="text-center py-8">
                                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Tag className="w-6 h-6 text-slate-400" />
                                    </div>
                                    <p className="text-slate-500 italic">No categories assigned</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
