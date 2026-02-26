export type FilterStatus = 'all' | 'passed' | 'failed' | 'new';
export type SortStatus = 'date_desc' | 'date_asc' | 'score_desc' | 'speed_asc' | 'speed_desc';

export type SelectOptions<T> = {
    value: T;
    label: string;
}

export type PropsType = {
    filterStatus: FilterStatus | null;
    sortStatus: SortStatus | null;
    setFilter: (selectedValue: FilterStatus) => void;
    setSort: (selectedValue: SortStatus) => void;
    status: "loading" | "error" | "success";
}
