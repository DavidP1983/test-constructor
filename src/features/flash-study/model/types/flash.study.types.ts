import type { Dispatch, SetStateAction } from "react";

/* FlashStudy types */
export type Difficulty = 1 | 2 | 3 | 4 | 5;
export type Filter = 'all' | 'repeat' | 'known';
export type Limit = 'all' | 10 | 20;
export type Sort = 'shuffle' | 'default';

export type FilterType = {
    status: Filter;
    difficulty?: Difficulty;
    limit?: Limit;
    sort?: Sort;
}

export interface FilterTypeProps {
    filters: FilterType;
    setFilters: Dispatch<SetStateAction<FilterType>>
}