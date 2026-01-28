'use client';

import { CompletedTest } from "@/shared/types/completed-type";
import { notify } from "@/shared/utils/notify";
import { notifyDuringOperation } from "@/shared/utils/notifyDuringOperation";
import { useCompletedTestsStore } from "@/widgets/test-pass/model/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/apiService";


export const useDeleteCompletedTest = () => {
    const removeBtnStatus = useCompletedTestsStore(state => state.removeBtnStatus);
    const queryClient = useQueryClient();

    const deleteCompletedTestMutation = useMutation({

        mutationFn: async (id: string) => await api.delete<CompletedTest>(`/completed/delete-completed-test/${id}`),

        async onSuccess(_, deletedId) {
            queryClient.setQueriesData<CompletedTest[]>({ queryKey: ['completedTests'] }, (old) => {
                if (!old) return []
                const data = old.filter(item => item?._id !== deletedId);
                return data;
            });
            notify('success', 'Item was deleted successfully');
            removeBtnStatus(deletedId)
        },

        onError() {
            notify('error', 'Failed to delete test, refresh page');
        }
    });

    const handleDeleteCompletedTest = async (testId: string | undefined) => {

        if (!testId) return;

        const configNotification = {
            title: 'Are you sure you want to delete this test ?',
            text: 'This action cannot be undone.',
            icon: 'warning',
            btnText: 'Delete'
        } as const;

        await notifyDuringOperation(configNotification).then((result) => {
            if (result.isConfirmed) {
                deleteCompletedTestMutation.mutate(testId);
            }
        });
    }
    return { handleDeleteCompletedTest };
}


