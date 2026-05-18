import { FlashCardsType } from '@/entities/flash-card/model/types/card.types';
import { GeneralFlashType } from '@/entities/flash-folder/model/types/folder.types';
import { create } from 'zustand';
import { defaultCardFieldsData, defaultCardFieldsFolderData } from './defaultState';



interface FlashCardStore {
    cardFieldsData: Partial<FlashCardsType>;
    cardFieldsFolderData: Partial<GeneralFlashType>;
    isDirty: boolean;
    isCardCreated: boolean;
    searchQuestion: string;
    cardId: string;
    currentCardIndex: number;
    handleNext: (length: number) => void;
    handlePrev: () => void;
    setIsDirty: (value: boolean) => void;
    setIsCardCreated: (value: boolean) => void;
    setCurrentCardIndex: (index: number) => void;
    setCardFieldsData: (cardData: Partial<FlashCardsType>) => void;
    setCardFieldsFormData: (formData: Partial<FlashCardsType>) => void;
    setCardFieldsFolderData: (folderData: Partial<GeneralFlashType>) => void;
    clearCardFields: () => void;
    setSearchQuestion: (value: string) => void;
}

export const useFlashCardStore = create<FlashCardStore>()((set) => ({
    isDirty: false,
    isCardCreated: false,
    searchQuestion: '',
    cardId: '',
    currentCardIndex: 0,
    cardFieldsData: defaultCardFieldsData,
    cardFieldsFolderData: defaultCardFieldsFolderData,

    setIsDirty: (value: boolean) => {
        set({ isDirty: value });
    },

    setIsCardCreated: (value: boolean) => {
        set({ isCardCreated: value });
    },

    setSearchQuestion: (value: string) => {
        set({ searchQuestion: value });
    },

    setCardFieldsData: (cardData: Partial<FlashCardsType>) => {
        set({
            cardFieldsData: {
                ...defaultCardFieldsData,
                ...cardData
            },
            cardId: cardData._id ?? '',
        });
    },

    setCardFieldsFormData: (formData: Partial<FlashCardsType>) => {
        set((state) => ({
            cardFieldsData: {
                ...state.cardFieldsData,
                ...formData
            },
        }));
    },

    setCardFieldsFolderData: (folderData: Partial<GeneralFlashType>) => {
        set((state) => ({
            cardFieldsFolderData: {
                ...state.cardFieldsFolderData,
                ...folderData
            },
        }));
    },

    handleNext: (length: number) => {
        set((state) => ({
            currentCardIndex: Math.min(state.currentCardIndex + 1, length - 1)
        }));
    },

    handlePrev: () => {
        set((state) => ({
            currentCardIndex: Math.max(state.currentCardIndex - 1, 0)
        }));
    },

    setCurrentCardIndex: (index: number) => {
        set({ currentCardIndex: index });
    },

    clearCardFields: () => {
        set({
            cardFieldsData: defaultCardFieldsData,
            cardId: ''
        });
    },

}));



