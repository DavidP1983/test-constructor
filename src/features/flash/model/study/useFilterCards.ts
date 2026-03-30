import { FlashCardsType } from "@/entities/flash/types/flashTypes";
import { shuffle } from "@/features/flash/model/study/utils/shuffleCards";
import { StateStudyFilterType } from "@/widgets/flash/ui/flash-study/FlashCardStudy";
import { useMemo } from "react";

export const useFilterCards = (cards: FlashCardsType[], filters: StateStudyFilterType) => {

    const filterResult = useMemo(() => {
        let result = [...cards];

        if (filters.status && filters.status !== 'all') {
            result = result.filter(item => item.status === filters.status);
        }

        if (filters.difficulty) {
            result = result.filter(item => item.difficulty === filters.difficulty);
        }

        if (filters.sort === 'shuffle') {
            result = shuffle(result);
        }

        if (filters.limit && filters.limit !== 'all') {
            result = result.slice(0, filters.limit)
        }

        return result

    }, [filters, cards]);

    return { filterResult }
}

