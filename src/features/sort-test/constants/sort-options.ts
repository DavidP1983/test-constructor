import { SelectOptions, SortStatus } from "../../../shared/types/select.types";

export const sortOptions: SelectOptions<SortStatus>[] = [
    { value: 'date_desc', label: 'Newest first' },
    { value: 'date_asc', label: 'Oldest first' },
    { value: 'score_desc', label: 'Highest score first' },
    { value: 'speed_asc', label: 'Fastest first' },
    { value: 'speed_desc', label: 'Slowest first' },
];