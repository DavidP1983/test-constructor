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
import { api } from "../api/apiService";


export const useAllTests = () => {
    const params = useSearchParams().get('q');
    const setUserTestData = useLoginForm((state) => state.setUserTestData);
    const id = useLoginForm(state => state.userData?.id);

    const { data, isLoading, isFetching, error, isPlaceholderData } = useQuery({
        queryKey: ['allTests', id, params],
        queryFn: async ({ signal }) => {
            return await api.get<AllTests[]>(`/test/get?q=${params ?? ''}`, signal)
        },
        staleTime: 1 * 1000 * 60,
        placeholderData: keepPreviousData,
        select: (data) => data?.toReversed(),
        enabled: !!id,
    });

    useEffect(() => {
        if (!data || isPlaceholderData) return;
        setUserTestData(data);
    }, [data, isPlaceholderData, setUserTestData]);


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
        contentHeader: ["Test name", "Created", "Participants", "Creator", "Actions"],
        status,
        error,
        isPlaceholderData
    }
}