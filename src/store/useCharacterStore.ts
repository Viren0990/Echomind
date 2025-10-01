import { create } from "zustand";
import { Pagination } from "@/types";


interface Character {
  id: string;
  title: string;
  profilePhotoURL: string;
  description: string;
  user: {
    id: string
    username: string;
  };
  chatCount: number;
}


interface CharacterStore {
  pages: Record<number, { characters: Character[]; pagination: Pagination }>; 
  setPageData: (page: number, characters: Character[], pagination: Pagination) => void;
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