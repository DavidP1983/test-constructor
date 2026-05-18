import { FlashCardsType } from "@/entities/flash-card/model/types/card.types";
import { shuffle } from "../utils";

const filterStatus = (cards: FlashCardsType[], value?: string | number) => {
    return cards.filter(item => item.status === value);
}

const FilterDifficulty = (cards: FlashCardsType[], value?: string | number) => {
    return cards.filter(item => item.difficulty === value);
}

const filterLimit = (cards: FlashCardsType[], value?: string | number) => {
    return cards.slice(0, Number(value));
}

const shuffleCards = (cards: FlashCardsType[]) => {
    return shuffle(cards);
}

export const Strategy = {
    'status': filterStatus,
    'difficulty': FilterDifficulty,
    'limit': filterLimit,
    'sort': shuffleCards
}
