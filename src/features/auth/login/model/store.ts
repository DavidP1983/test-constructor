import { AllTests } from '@/shared/types/test-type';
import { DataArgs, User } from '@/shared/types/user-type';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthService } from '../service/AuthService';

interface LoginFormStore {
    userData: User | null;
    hasAvatar: boolean;
    userTestData: AllTests[] | null;
    isAuth: boolean;
    isLoading: boolean;
    isLoginLoading: boolean;
    errorMessage: string;
    reset: () => void;
    registration: (data: DataArgs) => Promise<boolean>;
    login: (data: DataArgs) => Promise<boolean>;
    logout: () => Promise<void>;
    setUserTestData: (testData: AllTests[]) => void;
    clearErrorMessage: () => void;
}

export const useLoginForm = create<LoginFormStore>()(persist((set, get) => ({
    userData: null,
    hasAvatar: false,
    userTestData: null,
    isAuth: false,
    isLoading: false,
    isLoginLoading: false,
    errorMessage: '',

    reset: () => {
        set({ userData: null, userTestData: null, isAuth: false, hasAvatar: false })
    },

    registration: async (data: DataArgs) => {
        set({ isLoading: true })
        try {
            const response = await AuthService.registration(data.name, data.email, data.password);
            set({ userData: response, isAuth: true, errorMessage: '', hasAvatar: response.hasAvatar });
            return true;

        } catch (e) {
            if (e instanceof Error) {
                set({ userData: null, errorMessage: e.message, hasAvatar: false, isAuth: false })
            }
            return false
        } finally {
            set({ isLoading: false })
        }
    },

    login: async (data: DataArgs) => {
        set({ isLoginLoading: true });
        try {
            const response = await AuthService.login(data.email, data.password);
            set({ userData: response, isAuth: true, errorMessage: '', hasAvatar: response.hasAvatar });
            return true
        } catch (e) {
            if (e instanceof Error) {
                set({ userData: null, errorMessage: e.message, hasAvatar: false, isAuth: false })
            }
            return false
        } finally {
            set({ isLoginLoading: false })
        }
    },

    logout: async () => {
        try {
            await AuthService.logout();
            get().reset();
        } catch (e) {
            if (e instanceof Error) {
                set({ userData: null, errorMessage: e.message })
            }
        }
    },

    // Использую в useAllTests
    setUserTestData: (testData: AllTests[]) => {
        set({ userTestData: testData })
    },

    clearErrorMessage: () => {
        set({ errorMessage: '' })
    }
}), { name: 'useLoginForm', version: 3 }))