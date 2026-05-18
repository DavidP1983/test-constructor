'use client';
import { FlashCardsType } from "@/entities/flash-card/model/types/card.types";
import { useState } from "react";
import { FilterType } from "../types/flash.study.types";
import { useFilterCards } from "./useFilterCards";

export const useFlashcardFilters = (cards: FlashCardsType[]) => {
    const [filters, setFilters] = useState<FilterType>(
        {
            status: 'all',
            difficulty: undefined,
            limit: undefined,
            sort: undefined
        }
    );

    const { filterResult } = useFilterCards(cards, filters);
    const isEmpty = filterResult.length === 0;

    return {
        filters,
        setFilters,
        filterResult,
        isEmpty
    }
}