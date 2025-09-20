"use client"

import { Input } from "../ui/input"
import { Search, Sparkles, MessageCircle, User, Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { fetchAllCharacters } from "@/app/actions/character"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export const Grid = () => {
    const [characters, setCharacters] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 0,
        totalCount: 0,
        hasNextPage: false,
        hasPrevPage: false,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter()
    
    const CHARACTERS_PER_PAGE = 10;

    const handleCharacterClick = (id: string) => {
        router.push(`/explore/${id}`)
    }
    
    // Helper function to truncate description to 20 words
    const truncateDescription = (text: string, wordLimit: number = 20) => {
        const words = text.split(' ');
        if (words.length <= wordLimit) {
            return text;
        }
        return words.slice(0, wordLimit).join(' ') + '...';
    };
    
    // Fetch characters for a specific page
    const fetchCharacters = async (page: number) => {
        setLoading(true);
        setError(null);
            
        try {
            const result = await fetchAllCharacters(page, CHARACTERS_PER_PAGE);
            if (result.success) {
                setCharacters(result.characters);
                setPagination(result.pagination);
            } else {
                setError("Failed to load characters");
            }
        } catch (error: any) {
            setError("Something went wrong while loading characters");
        } finally {
            setLoading(false);
        }
    };

    // Load initial data
    useEffect(() => {
        fetchCharacters(1);
    }, []);

    // Handle page change
    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= pagination.totalPages) {
            setCurrentPage(page);
            fetchCharacters(page);
            // Scroll to top when page changes
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // Generate page numbers for pagination
    const getPageNumbers = () => {
        const pages = [];
        const { currentPage, totalPages } = pagination;
        
        // Show first page
        if (currentPage > 3) {
            pages.push(1);
            if (currentPage > 4) pages.push('...');
        }
        
        // Show pages around current page
        for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
            pages.push(i);
        }
        
        // Show last page
        if (currentPage < totalPages - 2) {
            if (currentPage < totalPages - 3) pages.push('...');
            pages.push(totalPages);
        }
        
        return pages;
    };

    return(
        <div>
            {/* Error Message */}
            {error && (
                <div className="max-w-4xl mx-auto mb-6">
                    <div className="bg-red-500/20 border border-red-400/50 text-red-100 p-4 rounded-xl text-center backdrop-blur-sm">
                        {error}
                    </div>
                </div>
            )}

            <div className="max-w-7xl mx-auto">
                {/* Loading State */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-16">
                        <div className="w-16 h-16 rounded-full border-4 border-indigo-500 border-t-white animate-spin mb-6"></div>
                        <div className="text-center text-white text-2xl font-semibold tracking-wide">
                            Loading<span className="animate-pulse">...</span>
                        </div>
                        <div className="text-slate-300 mt-2 text-sm">
                            Please wait while we fetch the latest characters for you!
                        </div>
                    </div>
                )}

                {/* Characters Grid */}
                {!loading && characters.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {characters.map((character: any) => (
                            <button 
                                key={character.id}
                                className="bg-white/95 backdrop-blur-sm rounded-2xl border border-white/20 shadow-2xl hover:shadow-indigo-500/20 transition-all duration-300 hover:scale-105 cursor-pointer group flex flex-col h-full hover:bg-white"
                                onClick={() => handleCharacterClick(character.id)}
                            >
                                {/* Character Image */}
                                <div className="relative w-full h-48 rounded-t-2xl overflow-hidden flex-shrink-0">
                                    <img
                                        src={character.profilePhotoURL}
                                        alt={character.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>

                                {/* Character Info */}
                                <div className="p-4 flex flex-col flex-grow">
                                    {/* Title */}
                                    <h3 className="text-lg font-bold text-slate-800 mb-2 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                                        {character.title}
                                    </h3>

                                    {/* Description */}
                                    <div className="flex-grow mb-3">
                                        <p className="text-slate-600 text-sm leading-relaxed h-10 overflow-hidden">
                                            {truncateDescription(character.description, 20)}
                                        </p>
                                    </div>

                                    {/* Tags */}
                                    <div className="h-6 mb-3">
                                        {character.tags && character.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-1">
                                                {character.tags.slice(0, 2).map((tag: any) => (
                                                    <span 
                                                        key={tag.id}
                                                        className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full border border-slate-200"
                                                    >
                                                        {tag.name}
                                                    </span>
                                                ))}
                                                {character.tags.length > 2 && (
                                                    <span className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full border border-slate-200">
                                                        +{character.tags.length - 2}
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    {/* Footer Info */}
                                    <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-200 mt-auto">
                                        <div className="flex items-center gap-1">
                                            <User className="w-3 h-3" />
                                            <span className="truncate">{character.user.username}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <MessageCircle className="w-3 h-3" />
                                            <span>{character.chatCount || 0}</span>
                                        </div>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                ) : (
                    !loading && !error && (
                        <div className="text-center py-16">
                            <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                                <Sparkles className="w-12 h-12 text-white/60" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">No Characters Yet</h3>
                            <p className="text-slate-300 text-lg max-w-md mx-auto">
                                Be the first to create an amazing character for the community to discover!
                            </p>
                        </div>
                    )
                )}
            </div>

            {/* Pagination */}
            {!loading && pagination.totalPages > 1 && (
                <div className="flex flex-col items-center mt-12 space-y-4">
                    {/* Page Info */}
                    <div className="text-slate-400 text-sm">
                        Showing {((pagination.currentPage - 1) * CHARACTERS_PER_PAGE) + 1} to {Math.min(pagination.currentPage * CHARACTERS_PER_PAGE, pagination.totalCount)} of {pagination.totalCount} characters
                    </div>
                    
                    {/* Pagination Controls */}
                    <div className="flex items-center gap-2">
                        {/* Previous Button */}
                        <button
                            onClick={() => handlePageChange(pagination.currentPage - 1)}
                            disabled={!pagination.hasPrevPage}
                            className="bg-white/95 hover:bg-white text-slate-700 font-semibold px-4 py-2 rounded-xl shadow-2xl hover:shadow-indigo-500/20 transition-all duration-300 hover:scale-105 border border-white/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>

                        {/* Page Numbers */}
                        <div className="flex items-center gap-1">
                            {getPageNumbers().map((page, index) => (
                                <div key={index}>
                                    {page === '...' ? (
                                        <span className="px-3 py-2 text-slate-400">...</span>
                                    ) : (
                                        <button
                                            onClick={() => handlePageChange(page as number)}
                                            className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 border ${
                                                page === pagination.currentPage
                                                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-2xl shadow-indigo-500/25'
                                                    : 'bg-white/95 hover:bg-white text-slate-700 border-white/50 shadow-2xl hover:shadow-indigo-500/20 hover:scale-105'
                                            }`}
                                        >
                                            {page}
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Next Button */}
                        <button
                            onClick={() => handlePageChange(pagination.currentPage + 1)}
                            disabled={!pagination.hasNextPage}
                            className="bg-white/95 hover:bg-white text-slate-700 font-semibold px-4 py-2 rounded-xl shadow-2xl hover:shadow-indigo-500/20 transition-all duration-300 hover:scale-105 border border-white/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
