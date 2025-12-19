'use client';

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';


interface TestStore {
    isOpen: boolean;
    openModal: (value: boolean) => void;
    closeModal: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const useModal = create<TestStore>()(devtools((set) => ({
    isOpen: false,
    openModal: (value) => set({ isOpen: value }),
    closeModal: (e) => {
        const target = e.target as HTMLElement;
        const overLay = target === e.currentTarget;
        const closeBtn = target.dataset.close !== undefined;

        if (overLay || closeBtn) {
            set({ isOpen: false })
        }
    }

}), { name: 'useModal', version: 1 }))


