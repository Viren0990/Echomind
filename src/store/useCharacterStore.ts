import { create } from "zustand";

interface Pagination {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface CharacterStore {
  pages: Record<number, { characters: any[]; pagination: Pagination }>; // ✅ cache by page
  setPageData: (page: number, characters: any[], pagination: Pagination) => void;
  clearCache: () => void;
}

export const useCharacterStore = create<CharacterStore>((set) => ({
  pages: {},

  setPageData: (page, characters, pagination) =>
    set((state) => ({
      pages: {
        ...state.pages,
        [page]: { characters, pagination }, // ✅ Store page-specific cache
      },
    })),

  clearCache: () => set({ pages: {} }),
}));