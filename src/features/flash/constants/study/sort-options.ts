import { SelectOptions, Sort } from "@/shared/types/select.types";

const sortOptions: SelectOptions<Sort>[] = [
    { value: 'shuffle', label: 'shuffle' },
    { value: 'default', label: 'original order' },
];

export default sortOptions;