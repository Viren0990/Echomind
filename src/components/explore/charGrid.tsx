"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { fetchAllCharacters } from "@/app/actions/character";
import { useCharacterStore } from "@/store/useCharacterStore";
import { User, MessageCircle, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import Image from 'next/image';

interface Character {
  id: string;
  title: string;
  profilePhotoURL: string;
  description: string;
  user: {
    username: string;
  };
  chatCount: number;
}

export const Grid = () => {
  const router = useRouter();
  const { pages, setPageData } = useCharacterStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(!pages[1]);
  const [error, setError] = useState<string | null>(null);
  const CHARACTERS_PER_PAGE = 10;



  
  const fetchCharacters = useCallback(async (page: number) => {
    if (pages[page]) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await fetchAllCharacters(page, CHARACTERS_PER_PAGE);
      if (result.success) {
        console.log(result.characters);
        setPageData(page, result.characters, result.pagination);
      } else {
        setError("Failed to load characters");
      }
    } catch {
      setError("Something went wrong while loading characters");
    } finally {
      setLoading(false);
    }
  }, [pages, setPageData]);

  useEffect(() => {
    if (!pages[1]) fetchCharacters(1);
  }, [fetchCharacters, pages]);

  const handlePageChange = (page: number) => {
    if (page < 1) return;
    setCurrentPage(page);
    fetchCharacters(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  const truncateDescription = (text: string, wordLimit: number = 30) => {
    const words = text.split(' ');
    if (words.length <= wordLimit) {
      return text;
    }
    return words.slice(0, wordLimit).join(' ') + '...';
  };

  const getPageNumbers = () => {
    const currentPagination = pages[currentPage]?.pagination;
    if (!currentPagination) return [];
    const { totalPages } = currentPagination;
    const pagesArr = [];
    if (currentPage > 3) {
      pagesArr.push(1);
      if (currentPage > 4) pagesArr.push("...");
    }
    for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
      pagesArr.push(i);
    }
    if (currentPage < totalPages - 2) {
      if (currentPage < totalPages - 3) pagesArr.push("...");
      pagesArr.push(totalPages);
    }
    return pagesArr;
  };

  const currentData = pages[currentPage];
  

  return (
    <div>
      {error && (
        <div className="max-w-4xl mx-auto mb-6">
          <div className="bg-red-500/20 border border-red-400/50 text-red-100 p-4 rounded-xl text-center backdrop-blur-sm">
            {error}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {loading && !currentData && (
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

        {!loading && currentData?.characters.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {currentData.characters.map((character: Character) => (
              <button
                key={character.id}
                onClick={() => router.push(`/explore/${character.id}`)}
                className="bg-white/95 backdrop-blur-sm rounded-2xl border border-white/20 shadow-2xl hover:shadow-indigo-500/20 transition-all duration-300 hover:scale-105 cursor-pointer group flex flex-col h-full hover:bg-white"
              >
                <div className="relative w-full h-48 rounded-t-2xl overflow-hidden flex-shrink-0">
                  <div className="relative w-full h-full">
                    <Image
                      src={character.profilePhotoURL}
                      alt={character.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
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

      {currentData && currentData.pagination.totalPages > 1 && (
        <div className="flex flex-col items-center mt-12 space-y-4">
        
          <div className="text-slate-400 text-sm">
            Showing {((currentData.pagination.currentPage - 1) * CHARACTERS_PER_PAGE) + 1} to {Math.min(currentData.pagination.currentPage * CHARACTERS_PER_PAGE, currentData.pagination.totalCount)} of {currentData.pagination.totalCount} characters
          </div>
          
         
          <div className="flex items-center gap-2">
         
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={!currentData.pagination.hasPrevPage}
              className="bg-white/95 hover:bg-white text-slate-700 font-semibold px-4 py-2 rounded-xl shadow-2xl hover:shadow-indigo-500/20 transition-all duration-300 hover:scale-105 border border-white/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

       
            <div className="flex items-center gap-1">
              {getPageNumbers().map((page, index) => (
                <div key={index}>
                  {page === '...' ? (
                    <span className="px-3 py-2 text-slate-400">...</span>
                  ) : (
                    <button
                      onClick={() => handlePageChange(page as number)}
                      className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 border ${
                        page === currentData.pagination.currentPage
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

            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={!currentData.pagination.hasNextPage}
              className="bg-white/95 hover:bg-white text-slate-700 font-semibold px-4 py-2 rounded-xl shadow-2xl hover:shadow-indigo-500/20 transition-all duration-300 hover:scale-105 border border-white/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
