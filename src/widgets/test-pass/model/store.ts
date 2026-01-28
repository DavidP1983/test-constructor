'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CompletedStore {
    completedTestsToken: string[];
    viewedTests: string[];
    totalCompletedTests: number;
    calculateCompletedTests: () => void;
    resetCompletedTestsCount: () => void;
    registerCompletedTest: (token: string) => void;
    markCompletedTestAsViewed: (tokenId: string) => void;
    changeBtnStatusAsViewed: (id: string | undefined) => void;
    removeBtnStatus: (testId: string) => void;
}

export const useCompletedTestsStore = create<CompletedStore>()(persist((set, get) => ({
    completedTestsToken: [],
    viewedTests: [],
    totalCompletedTests: 0,

    calculateCompletedTests: () => {
        set({ totalCompletedTests: get().totalCompletedTests + 1 });
    },

    resetCompletedTestsCount: () => {
        set({ totalCompletedTests: 0 });
    },

    registerCompletedTest: (token: string) => {
        set({ completedTestsToken: [...get().completedTestsToken, token] });
    },

    markCompletedTestAsViewed: (tokenId: string) => {
        const removeViewedToken = get().completedTestsToken.filter(id => id !== tokenId);
        set({ completedTestsToken: removeViewedToken });
    },

    changeBtnStatusAsViewed: (id: string | undefined) => {
        if (!id) return
        if (get().viewedTests.includes(id)) return get().viewedTests;
        set({ viewedTests: [...get().viewedTests, id] });

    },

    removeBtnStatus: (testId: string) => {
        const removeViewedTest = get().viewedTests.filter(id => id !== testId);
        set({ viewedTests: removeViewedTest });
    },

}), { name: 'useCompletedTestsStore', version: 6 }));
