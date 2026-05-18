import { SelectOptions } from "@/shared/types/select.types";
import { Filter } from "../types/flash.study.types";

export const filterOptions: SelectOptions<Filter>[] = [
    { value: 'all', label: 'all' },
    { value: 'repeat', label: 'needs review' },
    { value: 'known', label: 'known' },

];

