/**
 * Handles deletion of a test.
 *
 * Responsibilities:
 * - Sends delete request for a specific test
 * - Optimistically updates cached tests list
 *
 * Uses React Query for cache synchronization.
 * Does not expose mutation details to the UI.
 */

"use client";

import { api } from "@/entities/test-operation/api/apiService";
import { AllTests } from "@/shared/types/test-type";
import { useMutation, useQueryClient } from "@tanstack/react-query";



export const useDeleteTest = () => {

    const queryClient = useQueryClient();

    const deleteTestMutation = useMutation({
        mutationFn: async (id: string) => await api.delete<AllTests>(`builder/${id}`),

        async onSuccess(_, deleteId) {
            queryClient.setQueriesData<AllTests[]>({ queryKey: ['allTests'] }, (old) => {
                if (!old) return []
                const data = old.filter(item => item.id !== deleteId);
                return data
            })
        }

    });

    const handleDelete = (id: string) => {
        deleteTestMutation.mutate(id)
    }

    return {
        handleDelete
    }
}

