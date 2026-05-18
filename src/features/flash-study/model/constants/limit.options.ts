import { SelectOptions } from "@/shared/types/select.types";
import { Limit } from "../types/flash.study.types";

export const limitOptions: SelectOptions<Limit>[] = [
    { value: 'all', label: 'all' },
    { value: 10, label: '10' },
    { value: 20, label: '20' },

];

