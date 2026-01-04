/**
 * Fetches all available tests and prepares data for UI consumption.
 *
 * Responsibilities:
 * - Retrieves full tests list
 * - Exposes unified loading / error / success status
 * - Provides static table header configuration
 *
 * Uses React Query for data fetching and caching.
 * Contains no mutation or business logic.
 */

import { useLoginForm } from "@/features/auth/login/model/store";
import { AllTests } from "@/shared/types/test-type";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";
import { api } from "../api/apiService";


export const useAllTests = () => {
    const params = useSearchParams().get('q');
    const { setUserTestData, userData } = useLoginForm(useShallow((state) => ({
        setUserTestData: state.setUserTestData,
        userData: state.userData
    })));
    const id = userData?.id;
    const role = userData?.role;

    const { data, isLoading, isFetching, error, isPlaceholderData } = useQuery({
        queryKey: ['allTests', id, params],
        queryFn: async () => {
            if (!id) return []
            if (role === 'Admin') {
                return await api.get<AllTests[]>(`builder?q=${params ?? ''}`)
            }
            return await api.get<AllTests[]>(`builder?authorId=${id}&q=${params ?? ''}`)
        },
        staleTime: 1 * 1000 * 60,
        placeholderData: keepPreviousData,
        select: (data) => data?.toReversed(),
        enabled: !!id
    });

    useEffect(() => {
        if (!data) {
            return undefined
        }
        setUserTestData(data);
    }, [data, setUserTestData]);


    let status: "loading" | "error" | "success";
    if (isLoading || (isFetching && !params)) {
        status = 'loading'
    } else if (error) {
        status = 'error'
    } else {
        status = 'success'
    }

    return {
        data: data ?? [],
        contentHeader: ["Name", "Date of creation", "Number of participants", "Actions"],
        status,
        isPlaceholderData
    }
}