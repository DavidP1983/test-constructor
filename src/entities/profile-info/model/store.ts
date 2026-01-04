'use client';

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface ProfileStore {
    avatar: string | null;
    setAvatar: (val: string) => void;
}

export const useProfile = create<ProfileStore>()(persist(devtools((set) => ({
    avatar: null,
    setAvatar: (val: string) => {
        set({ avatar: val })
    }

}), { store: "profile", enabled: process.env.NODE_ENV === 'development' }), { name: 'useProfile', version: 2 }))