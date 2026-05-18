'use client';
import { GeneralFlashType } from "@/entities/flash-folder/model/types/folder.types";
import { createContext, type Dispatch, type SetStateAction } from "react";

type FlashCardContextType = {
    folderData: GeneralFlashType;
    mode: 'create' | 'edit';
    isOpenFormEditor: boolean;
    setIsOpenFormEditor: Dispatch<SetStateAction<boolean>>;
}

export const FlashCardContext = createContext<FlashCardContextType | null>(null);

