import { GeneralFlashType } from "@/entities/flash/types/flashTypes";
import { useMemo } from "react";


export const useFilterSortSelection = (receivingData: GeneralFlashType[], { search, select }: { search: string, select: string }) => {

    const sortByTag = useMemo(() => {
        if (!select || select === 'all') return receivingData;
        return receivingData.filter(item => item.tag?.toLowerCase().includes(select.toLowerCase()))
    }, [receivingData, select])

    const filteredAndSortedData = useMemo(() => {
        if (!search) return sortByTag;
        return sortByTag.filter(item => item.title.toLowerCase().includes(search.toLowerCase()))
    }, [sortByTag, search]);

    return filteredAndSortedData;
}


