import { create } from "zustand";
import { Pagination } from "@/types";

interface CharacterStore {
  pages: Record<number, { characters: any[]; pagination: Pagination }>; 
  setPageData: (page: number, characters: any[], pagination: Pagination) => void;
  clearCache: () => void;
}

export const useCharacterStore = create<CharacterStore>((set) => ({
  pages: {},

  setPageData: (page, characters, pagination) =>
    set((state) => ({
      pages: {
        ...state.pages,
        [page]: { characters, pagination }, 
      },
    })),

  clearCache: () => set({ pages: {} }),
}));