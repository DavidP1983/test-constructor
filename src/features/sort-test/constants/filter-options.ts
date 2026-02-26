import { FilterStatus, SelectOptions } from "../types/filter.types";

export const filterOptions: SelectOptions<FilterStatus>[] = [
    { value: 'all', label: 'All' },
    { value: 'passed', label: 'Passed' },
    { value: 'failed', label: 'Failed' },
    { value: 'new', label: 'New' },
];