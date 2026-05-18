'use client';
import { GeneralFlashType } from "@/entities/flash-folder/model/types/folder.types";
import { useMemo, useState } from "react";
import { FlashCardContext } from "./FlashCardContext";


export const FlashCardProvider = (
    { children, folderData, mode }:
        {
            children: React.ReactNode,
            folderData: GeneralFlashType,
            mode: 'create' | 'edit'
        }) => {

    const [isOpenFormEditor, setIsOpenFormEditor] = useState(false);
    const value = useMemo(() => ({
        folderData,
        mode,
        isOpenFormEditor,
        setIsOpenFormEditor
    }), [folderData, mode, isOpenFormEditor]);

    return (
        <FlashCardContext.Provider value={value}>
            {children}
        </FlashCardContext.Provider>
    );
}