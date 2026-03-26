'use client';

import { GeneralFlashType } from "@/entities/flash/types/flashTypes";
import { useUpsertFolder } from "../card/useUpsertFolder";
import { FolderFormContext } from "./FolderFormContext";

export const FolderFormProvider = (
    { children, folderData, mode }:
        {
            children: React.ReactNode,
            folderData: GeneralFlashType,
            mode: 'create' | 'edit'
        }) => {

    const value = useUpsertFolder(folderData, mode);

    return (
        <FolderFormContext.Provider value={value}>
            {children}
        </FolderFormContext.Provider>
    );
}