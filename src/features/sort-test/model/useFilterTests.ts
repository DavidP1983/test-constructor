import { CompletedTest } from "@/shared/types/completed-type";
import { FilterStatus, SortStatus } from "@/shared/types/select.types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { filterData } from "../utils/filter";
import { sortData } from "../utils/sort";



export const useFilterTests = (data: CompletedTest[], completedTestsToken: string[]) => {
    const [filter, setFilter] = useState<FilterStatus | null>(null);
    const [sort, setSort] = useState<SortStatus | null>(null);

    const currentParams = useSearchParams();
    const router = useRouter();
    const pathName = usePathname();


    const handleFilterCompletedTest = (selectedValue: FilterStatus) => {
        const params = new URLSearchParams(currentParams);
        setFilter(selectedValue);

        if (selectedValue) {
            params.set('status', selectedValue)
        } else {
            params.delete('status')
        }
        router.replace(`${pathName}?${params.toString()}`)
    }

    const handleSortCompletedTest = (selectedValue: SortStatus) => {
        const params = new URLSearchParams(currentParams);
        setSort(selectedValue);

        if (selectedValue) {
            params.set('sort', selectedValue)
        } else {
            params.delete('sort')
        }
        router.replace(`${pathName}?${params.toString()}`)
    }

    const filteredAndSortedData = useMemo(() => {
        const filteredAndSortedData = sortData(filterData(data, filter, completedTestsToken), sort);
        return filteredAndSortedData
    }, [data, filter, sort, completedTestsToken])

    return {
        filter,
        sort,
        handleFilterCompletedTest,
        handleSortCompletedTest,
        filteredAndSortedData
    }
}