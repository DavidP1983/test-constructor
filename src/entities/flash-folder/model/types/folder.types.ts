import { FlashCardsType } from "@/entities/flash-card/model/types/card.types";

export type GeneralFlashType = {
    _id: string;
    authorId: string;
    tag: string | null;
    title: string;
    abb: string;
    color?: string;
    description: string | null;
    createdAt: string;
    cards?: FlashCardsType[];
}

