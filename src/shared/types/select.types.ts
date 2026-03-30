/* FilterTests types*/
export type FilterStatus = 'all' | 'passed' | 'failed' | 'new';
export type SortStatus = 'date_desc' | 'date_asc' | 'score_desc' | 'speed_asc' | 'speed_desc';


export type PropsType = {
    filterStatus: FilterStatus | null;
    sortStatus: SortStatus | null;
    setFilter: (selectedValue: FilterStatus) => void;
    setSort: (selectedValue: SortStatus) => void;
    status: "loading" | "error" | "success";
}

/* FeedbackFrom types */
export type WhoSelect = 'employer' | 'developer' | 'student' | 'other';
export type UseSelect = 'very ease' | 'normal' | 'hard';
export type SpeedSelect = 'fast' | 'acceptable' | 'slow';


/* FlashCard Form types*/
export type Difficulty = 1 | 2 | 3 | 4 | 5;
export type Example = 'code' | 'text' | 'formula';
export type Language = 'ru' | 'en' | 'fr';

/* FlashStudy types */
export type Filter = 'all' | 'repeat' | 'known';
export type Limit = 'all' | 10 | 20;
export type Sort = 'shuffle' | 'default';

/*General Select types*/
export type SelectOptions<T> = {
    value: T;
    label: string;
}

