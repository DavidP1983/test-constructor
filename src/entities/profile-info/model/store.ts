'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProfileStore {
    avatarUrl: null | string;
    setAvatar: (val: string | null) => void;
}

export const useProfile = create<ProfileStore>()(persist((set) => ({
    avatarUrl: null,

    setAvatar: (val: string | null) => {
        set({ avatarUrl: val });
    },

}), { name: 'useProfile', version: 5 }));