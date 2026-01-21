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

import { AllTests } from "@/shared/types/test-type";
import { useQuery } from "@tanstack/react-query";
import { api } from "../api/apiService";


export const useCompletedTests = () => {

    const { data, isLoading, isFetching, error } = useQuery({
        queryKey: ['completedTests'],
        queryFn: async ({ signal }) => {
            return await api.get<AllTests[]>(`/test/get`, signal)

        },
        select: (data) => data?.toReversed(),
        staleTime: 1 * 60 * 1000
    })

    let status: "loading" | "error" | "success";
    if (isLoading || isFetching) {
        status = 'loading'
    } else if (error) {
        status = 'error'
    } else {
        status = 'success'
    }

    return {
        data: data ?? [],
        status,
        error,
        contentHeader: ["Name", "Date of creation", "Result", "Actions"]
    }
}

