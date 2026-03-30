
export type FlashCardsType = {
    _id: string;
    tag: string | null;
    question: string;
    answer: string;
    example?: string | null;
    type?: 'code' | 'text' | 'formula';
    status?: 'known' | 'repeat' | null;
    img?: string | null;
    createdAt: string;
    updatedAt: string;
    difficulty: 1 | 2 | 3 | 4 | 5;
    lang: 'ru' | 'en' | 'fr';
}

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


