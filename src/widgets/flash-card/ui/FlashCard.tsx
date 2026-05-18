'use client';

import { useGetCard } from "@/entities/flash-card";
import { GeneralFlashType } from "@/entities/flash-folder/model/types/folder.types";
import { FlashCardProvider } from "@/features/flash-card";
import { FlashCardContent } from "./FlashCardContent";

export const FlashCard = (
    { serverFolderData, mode, slug }:
        { serverFolderData: GeneralFlashType, mode: 'create' | 'edit', slug: string }) => {

    const { data: folderData } = useGetCard(slug, serverFolderData);

    return (
        <FlashCardProvider folderData={folderData} mode={mode}>
            <FlashCardContent />
        </FlashCardProvider>
    );

}

