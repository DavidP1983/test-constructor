import { SelectOptions, SpeedSelect } from "@/shared/types/select.types";

const speedSelect: SelectOptions<SpeedSelect>[] = [
    { value: 'fast', label: 'Fast' },
    { value: 'acceptable', label: 'Acceptable' },
    { value: 'slow', label: 'Slow' },
];

export default speedSelect;
