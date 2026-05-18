'use client';

import { useGetCard } from "@/entities/flash-card";
import { GeneralFlashType } from "@/entities/flash-folder/model/types/folder.types";
import { FlashStudyContent } from "./FlashStudyContent";

export const FlashStudy = (
    { serverFolderData, slug }:
        { serverFolderData: GeneralFlashType, slug: string }) => {

    const { data } = useGetCard(slug, serverFolderData);

    return (
        <FlashStudyContent folderData={data} />
    );

}

