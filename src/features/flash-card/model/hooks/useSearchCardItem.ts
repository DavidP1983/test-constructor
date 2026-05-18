import { GeneralFlashType } from "@/entities/flash-folder/model/types/folder.types";
import { useMemo } from "react";

export const useSearchCardItem = (char: string, folderData: GeneralFlashType) => {

    const cards = useMemo(() => {
        const cards = folderData?.cards || [];

        if (!char.trim()) return cards;

        return cards.filter(card => card.question.toLowerCase().includes(char.toLowerCase()));

    }, [char, folderData]);

    return { cards }
}