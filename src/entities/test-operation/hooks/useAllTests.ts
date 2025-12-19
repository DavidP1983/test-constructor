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
import { useQuery } from "@tanstack/react-query";
import { api } from "../api/apiService";


export const useAllTests = () => {
    const { data, isLoading, isFetching, error } = useQuery({
        queryKey: ['allTests'],
        queryFn: async () => await api.get('tests'),
        staleTime: 1 * 1000 * 60
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
        statusForContent
    }
}