import { SelectOptions, WhoSelect } from "@/shared/types/select.types";

export const whoOptions: SelectOptions<WhoSelect>[] = [
    { value: 'employer', label: 'Employer' },
    { value: 'developer', label: 'Developer' },
    { value: 'student', label: 'Student' },
    { value: 'other', label: 'Other' },
]