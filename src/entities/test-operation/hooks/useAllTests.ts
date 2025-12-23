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

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { api } from "../api/apiService";


export const useAllTests = () => {
    const params = useSearchParams().get('q');
    const { data, isLoading, isFetching, error, isPlaceholderData } = useQuery({
        queryKey: ['allTests', params],
        queryFn: async () => await api.get(`builder?q=${params ?? ''}`),
        staleTime: 1 * 1000 * 60,
        placeholderData: keepPreviousData
    })

    const contentHeader = ["Name", "Date of creation", "Number of participants", "Actions"]


    let statusForContent: "pending" | "error" | "success";
    if (isLoading || isFetching) {
        statusForContent = 'pending'
    } else if (error) {
        statusForContent = 'error'
    } else {
        statusForContent = 'success'
    }


    return {
        data,
        contentHeader,
        statusForContent,
        params,
        isPlaceholderData
    }
}