import { SelectOptions } from "@/shared/types/select.types";
import { Sort } from "../types/flash.study.types";

export const sortOptions: SelectOptions<Sort>[] = [
    { value: 'shuffle', label: 'shuffle' },
    { value: 'default', label: 'original order' },
];
