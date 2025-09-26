"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchAllCharacters } from "@/app/actions/character";
import { useCharacterStore } from "@/store/useCharacterStore";
import { User, MessageCircle, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

export const Grid = () => {
  const router = useRouter();
  const { pages, setPageData } = useCharacterStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(!pages[1]); // ✅ if page 1 not cached
  const [error, setError] = useState<string | null>(null);
  const CHARACTERS_PER_PAGE = 10;

  const fetchCharacters = async (page: number) => {
    if (pages[page]) return; // ✅ Already cached → skip fetching

    setLoading(true);
    setError(null);

    try {
      const result = await fetchAllCharacters(page, CHARACTERS_PER_PAGE);
      if (result.success) {
        setPageData(page, result.characters, result.pagination);
      } else {
        setError("Failed to load characters");
      }
    } catch {
      setError("Something went wrong while loading characters");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // ✅ Load page 1 on first visit
    if (!pages[1]) fetchCharacters(1);
  }, []);

  const handlePageChange = (page: number) => {
    if (page < 1) return;
    setCurrentPage(page);
    fetchCharacters(page); // ✅ Only fetch if not cached
    window.scrollTo({ top: 0, behavior: "smooth" });
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
      {/* Error Message */}
      {error && (
        <div className="max-w-4xl mx-auto mb-6">
          <div className="bg-red-500/20 border border-red-400/50 text-red-100 p-4 rounded-xl text-center">
            {error}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {loading && !currentData && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 rounded-full border-4 border-indigo-500 border-t-white animate-spin mb-6"></div>
            <div className="text-center text-white text-2xl font-semibold">Loading...</div>
          </div>
        )}

        {/* Characters Grid */}
        {!loading && currentData?.characters.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {currentData.characters.map((character: any) => (
              <button
                key={character.id}
                onClick={() => router.push(`/explore/${character.id}`)}
                className="bg-white/95 rounded-2xl border border-white/20 shadow-2xl hover:shadow-indigo-500/20 transition-all duration-300 hover:scale-105"
              >
                {/* Image */}
                <div className="relative w-full h-48 rounded-t-2xl overflow-hidden">
                  <img
                    src={character.profilePhotoURL}
                    alt={character.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-slate-800 mb-2">{character.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {character.description.slice(0, 60)}...
                  </p>
                </div>
              </button>
            ))}
          </div>
        ) : (
          !loading &&
          !error && (
            <div className="text-center py-16">
              <Sparkles className="w-12 h-12 text-white/60 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">No Characters Yet</h3>
            </div>
          )
        )}
      </div>

      {/* Pagination */}
      {currentData && currentData.pagination.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={!currentData.pagination.hasPrevPage}
            className="px-4 py-2 rounded bg-white/80"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {getPageNumbers().map((p, idx) =>
            p === "..." ? (
              <span key={idx}>...</span>
            ) : (
              <button
                key={idx}
                onClick={() => handlePageChange(p as number)}
                className={`px-4 py-2 rounded ${
                  p === currentPage ? "bg-indigo-600 text-white" : "bg-white/80"
                }`}
              >
                {p}
              </button>
            )
          )}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={!currentData.pagination.hasNextPage}
            className="px-4 py-2 rounded bg-white/80"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
