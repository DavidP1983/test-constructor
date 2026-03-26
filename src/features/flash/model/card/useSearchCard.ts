import { GeneralFlashType } from "@/entities/flash/types/flashTypes";
import { useMemo } from "react";

export const useSearchCard = (char: string, folderData: GeneralFlashType) => {

    const cards = useMemo(() => {
        const cards = folderData?.cards || [];

        if (!char.trim()) return cards;

        return cards.filter(card => card.question.toLowerCase().includes(char.toLowerCase()));

    }, [char, folderData]);

    return { cards }
}