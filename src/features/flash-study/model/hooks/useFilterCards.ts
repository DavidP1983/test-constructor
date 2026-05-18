import { FlashCardsType } from "@/entities/flash-card/model/types/card.types";
import { useMemo } from "react";
import { FilterType } from "../types/flash.study.types";
import { Strategy } from "./Strategy";


export const useFilterCards = (cards: FlashCardsType[], filters: FilterType) => {

    const filterResult = useMemo(() => {
        let result = [...cards];

        Object.entries(filters).forEach(([key, value]) => {

            if (!value || value === 'all' || value === 'default') return;
            const strategy = Strategy[key as keyof typeof Strategy];

            if (!strategy) return;
            result = strategy(result, value);
        });

        return result

    }, [filters, cards]);

    return { filterResult }
}

