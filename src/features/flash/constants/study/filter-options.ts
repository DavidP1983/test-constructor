import { Filter, SelectOptions } from "@/shared/types/select.types";

const filterOptions: SelectOptions<Filter>[] = [
    { value: 'all', label: 'all' },
    { value: 'repeat', label: 'needs review' },
    { value: 'known', label: 'known' },

];

export default filterOptions;