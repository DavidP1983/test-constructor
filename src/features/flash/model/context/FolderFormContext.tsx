'use client';
import { FlashCardsType, GeneralFlashType } from '@/entities/flash/types/flashTypes';
import { createContext, type Dispatch, type FormEvent, type SetStateAction, useContext } from 'react';
import { FlashSelectType } from '../../types/flash-types';
import { NavigationCard } from '../../types/navigation-types';

type FolderFormContextType = {
    folderData: GeneralFlashType;
    mode: 'create' | 'edit';
    isDirty: boolean;
    isOpenFormEditor: boolean;
    isPendingCreate: boolean;
    isPendingUpdate: boolean;
    formFieldsData: Partial<FlashCardsType>;
    folderEditData: { title: string, description: string };
    cardId: string;
    navigationActions: NavigationCard,
    searchQuestion: string;
    setFormFieldsData: Dispatch<SetStateAction<Partial<FlashCardsType>>>;
    setSearchQuestion: Dispatch<SetStateAction<Partial<string>>>;
    handleEditFolderData: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleOpenFormEditor: () => void;
    handleCardFormInputData: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleCardFormSelectData: (name: FlashSelectType, value: string | number) => void;
    handleTextEditorChange: (name: 'answer', value: string) => void;
    handleUpsert: (signal: 'form' | 'link', e?: FormEvent,) => Promise<void>;
    handleEditCard: (cardData: FlashCardsType) => void;
    handleDiscardChanges: () => void;
    handleDeleteCard: (id: string) => void;
}

export const FolderFormContext = createContext<FolderFormContextType | null>(null);

export const useFolderFormContext = () => {
    const context = useContext(FolderFormContext)

    if (!context) {
        throw new Error('useFolderFormContext must be used within FolderFormProvider')
    }
    return context;
}