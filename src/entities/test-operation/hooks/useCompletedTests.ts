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

import { CompletedTest } from "@/shared/types/completed-type";
import { useCompletedTestsStore } from "@/widgets/test-pass/model/store";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { api } from "../api/apiService";


export const useCompletedTests = () => {
    const id = useSearchParams().get('id');
    const resetCompletedTestsCount = useCompletedTestsStore(state => state.resetCompletedTestsCount);

    const { data, isLoading, isFetching, error } = useQuery({
        queryKey: ['completedTests'],
        queryFn: async ({ signal }) => {
            return await api.get<CompletedTest[]>(`/completed/get-completed-test/${id}`, signal)

        },
        staleTime: 1 * 60 * 1000
    });

    useEffect(() => {
        resetCompletedTestsCount();
    }, [data, resetCompletedTestsCount]);



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
        contentHeader: ["Name", "Date of creation", "Result", "Candidate", "Status", "Actions"]
    }
}

