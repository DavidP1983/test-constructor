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

import { useLoginForm } from "@/features/auth/login/model/store";
import { AllTests } from "@/shared/types/test-type";
import { useQuery } from "@tanstack/react-query";
import { api } from "../api/apiService";


export const useCompletedTests = () => {
    const userData = useLoginForm(state => state.userData);
    const id = userData?.id;
    const role = userData?.role;

    const { data, isLoading, isFetching, error } = useQuery({
        queryKey: ['completedTests', id, role],
        queryFn: async () => {
            if (!id) return []
            if (role === "Admin") {
                return await api.get<AllTests[]>('builder')
            }
            return await api.get<AllTests[]>(`builder?authorId=${id}`);
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
        contentHeader: ["Name", "Date of creation", "Result", "Actions"]
    }
}

