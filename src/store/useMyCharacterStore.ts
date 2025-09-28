import { create } from "zustand";

interface myCharacter {
    id: string;
    title: string;
    profilePhotoURL: string;
    description: string;
    user: { id: string; username: string };
    tags: { id: string; name: string }[];
    _count: { chats: number };
}

interface myCharacterStore {
    characters: myCharacter[] | null;
    totalCount: number;
    setMyCharacters: (chars: myCharacter[], count: number) => void;
    clearCache: ()=>void
}

export const useMyCharacterStore = create<myCharacterStore>((set)=>({
    characters: null,
    totalCount: 0,

    setMyCharacters: (chars, count) => set({ characters: chars, totalCount: count }),

    clearCache: () => set({ characters: null, totalCount: 0 }),
}));