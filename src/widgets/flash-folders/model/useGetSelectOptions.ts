import { GeneralFlashType } from "@/entities/flash-folder/model/types/folder.types";
import { SelectOptions } from "@/shared/types/select.types";
import { useMemo } from "react";


export const useGetSelectOptions = (data: GeneralFlashType[]): SelectOptions<string>[] => {

    const selectOptions = useMemo(() => {
        const tags = Array.from(new Set(data.map(item => item.tag)))

        return [
            { value: 'all', label: 'All' },
            ...tags.map(tag => ({ value: tag as string, label: tag as string }))
        ]
    }, [data]);
    return selectOptions;
}