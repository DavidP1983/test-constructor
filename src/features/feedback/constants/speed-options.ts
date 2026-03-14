import { SelectOptions, SpeedSelect } from "@/shared/types/select.types";

export const speedSelect: SelectOptions<SpeedSelect>[] = [
    { value: 'fast', label: 'Fast' },
    { value: 'acceptable', label: 'Acceptable' },
    { value: 'slow', label: 'Slow' },
]