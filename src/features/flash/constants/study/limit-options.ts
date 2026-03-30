import { Limit, SelectOptions } from "@/shared/types/select.types";

const limitOptions: SelectOptions<Limit>[] = [
    { value: 'all', label: 'all' },
    { value: 10, label: '10' },
    { value: 20, label: '20' },

];

export default limitOptions;