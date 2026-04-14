/* eslint-disable @typescript-eslint/no-explicit-any */
import { AllTests } from '@/shared/types/test-type';
import { DataArgs, User } from '@/shared/types/user-type';
import { notify } from '@/shared/utils/notify';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthService } from '../service/AuthService';


export type AuthStep =
    'idle' |
    'loadingReg' |
    'loadingLog' |
    'loadingVerification' |
    'resendLogin' |
    'verification' |
    'authenticated' |
    'error' |
    'limit' |
    'resendError';

interface LoginFormStore {
    userData: User | null;
    hasAvatar: boolean;
    userTestData: AllTests[] | null;
    authStep: AuthStep;
    isAuth: boolean;
    tryLimit: number;
    retryAfter: number;
    errorMessage: string;
    reset: () => void;
    registration: (data: DataArgs) => Promise<boolean>;
    login: (data: DataArgs) => Promise<boolean>;
    codeVerification: (code: string) => Promise<boolean>;
    resendCode: () => Promise<void>;
    logout: () => Promise<void>;
    setUserTestData: (testData: AllTests[]) => void;
    clearErrorMessage: () => void;
}

export const useLoginForm = create<LoginFormStore>()(persist((set, get) => ({
    userData: null,
    hasAvatar: false,
    userTestData: null,
    authStep: 'idle',
    isAuth: false,
    errorMessage: '',
    tryLimit: 0,
    retryAfter: 0,

    reset: () => {
        set({ userData: null, userTestData: null, authStep: 'idle', hasAvatar: false, isAuth: false, tryLimit: 0 })
    },

    registration: async (data: DataArgs) => {
        set({ authStep: 'loadingReg' })
        try {
            const response = await AuthService.registration(data.name, data.email, data.password);
            set({ userData: response, authStep: 'authenticated', errorMessage: '', hasAvatar: response.hasAvatar });
            return true;

        } catch (e) {
            if (e instanceof Error) {
                set({ userData: null, errorMessage: e.message, hasAvatar: false, authStep: 'error' })
            }
            return false
        }
    },

    login: async (data: DataArgs) => {
        set({ authStep: 'loadingLog' });
        try {
            const { requires2FA, user } = await AuthService.login(data.email, data.password);
            if (requires2FA) {
                set({ userData: user, authStep: 'verification', isAuth: true, errorMessage: '' });
            }
            return true
        } catch (e) {
            if (e instanceof Error) {
                set({ userData: null, authStep: 'error', isAuth: false, errorMessage: e.message })
            }
            return false
        }
    },

    codeVerification: async (code: string) => {
        set({ authStep: 'loadingVerification' });
        try {
            const userId = get().userData?.id;
            if (!userId) {
                return false;
            }
            const response = await AuthService.verification(code, userId);
            set({ userData: response, authStep: 'authenticated', hasAvatar: response.hasAvatar, retryAfter: 0, tryLimit: 0 });
            return true
        } catch (e) {
            const err = e as any;
            const timer = err?.errors?.retryAfter;
            const newLimit = get().tryLimit + 1;
            set({ tryLimit: newLimit })
            if (newLimit >= 4) {
                set({ authStep: 'limit', retryAfter: timer })
            } else {
                set({ authStep: 'error' })

                setTimeout(() => {
                    set({ authStep: 'verification' })
                }, 1000);
            }

            throw e;
        }
    },

    resendCode: async () => {
        set({ authStep: 'resendLogin' });
        try {
            const data = get().userData;
            if (!data?.email && !data?.id) {
                return
            }
            const { requires2FA } = await AuthService.resend(data?.id, data.email);
            if (requires2FA) {
                notify('info', 'New code verification was send to your email address.')
                set({ tryLimit: 0, authStep: 'verification' });
            }
        } catch {
            set({ authStep: 'resendError' });
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