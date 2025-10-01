import { create } from "zustand";
import {myCharacterStore} from "@/types"

export const useMyCharacterStore = create<myCharacterStore>((set)=>({
    characters: null,
    totalCount: 0,

    setMyCharacters: (chars, count) => set({ characters: chars, totalCount: count }),

    clearCache: () => set({ characters: null, totalCount: 0 }),
}));