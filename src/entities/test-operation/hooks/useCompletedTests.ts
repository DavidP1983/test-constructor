/**
 * Fetches completed tests and prepares data for presentation.
 *
 * Responsibilities:
 * - Retrieves completed tests list
 * - Provides loading / error / success status for UI rendering
 * - Supplies static table header configuration
 *
 * Uses React Query for data fetching and caching.
 * Contains no mutation or business logic.
 */

import { useQuery } from "@tanstack/react-query";
import { api } from "../api/apiService";


export const useCompletedTests = () => {
    const { data, isLoading, isFetching, error } = useQuery({
        queryKey: ['completedTests'],
        queryFn: async () => await api.get('builder'),
        initialDataUpdatedAt: 0,
        staleTime: 1 * 60 * 1000
    })

    const contentHeader = ["Name", "Date of creation", "Result", "Actions"];

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
        statusForContent
    }
}