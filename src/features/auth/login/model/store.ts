import { AllTests } from '@/shared/types/test-type';
import { DataArgs, UserDTO } from '@/shared/types/user-type';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthService } from '../service/AuthService';
import { userDTO } from './user.dto';

interface LoginFormStore {
    userData: UserDTO | null;
    userTestData: AllTests[] | null;
    isAuth: boolean;
    isLoading: boolean;
    isLoginLoading: boolean;
    errorMessage: string;
    reset: () => void;
    registration: (data: DataArgs) => Promise<boolean>;
    login: (data: DataArgs) => Promise<boolean>;
    logout: () => void;
    setUserTestData: (testData: AllTests[]) => void;
    clearErrorMessage: () => void;
}

export const useLoginForm = create<LoginFormStore>()(persist((set, get) => ({
    userData: null,
    userTestData: null,
    isAuth: false,
    isLoading: false,
    isLoginLoading: false,
    errorMessage: '',

    reset: () => {
        set({ userData: null, userTestData: null, isAuth: false })
    },

    registration: async (data: DataArgs) => {
        set({ isLoading: true })
        try {
            const response = await AuthService.registration(data.name, data.email, data.password);
            const res = userDTO(response);
            set({ userData: res, isAuth: true, errorMessage: '' });
            return true;

        } catch (e) {
            if (e instanceof Error) {
                set({ userData: null, errorMessage: e.message })
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
            const res = userDTO(response);
            set({ userData: res, isAuth: true, errorMessage: '' });
            return true
        } catch (e) {
            if (e instanceof Error) {
                set({ userData: null, errorMessage: e.message })
            }
            return false
        } finally {
            set({ isLoginLoading: false })
        }
    },

    logout: async () => {
        await AuthService.logout();
        get().reset();
    },

    // Использую в useAllTests
    setUserTestData: (testData: AllTests[]) => {
        set({ userTestData: testData })
    },

    clearErrorMessage: () => {
        set({ errorMessage: '' })
    }
}), { name: 'useLoginForm', version: 3 }))