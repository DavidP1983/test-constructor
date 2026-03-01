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
import { notify } from "@/shared/utils/notify";
import { notifyDuringOperation } from "@/shared/utils/notifyDuringOperation";
import { useMutation, useQueryClient } from "@tanstack/react-query";



export const useDeleteTest = () => {

    const queryClient = useQueryClient();

    const deleteTestMutation = useMutation({
        mutationFn: async (id: string) => await api.delete<AllTests>(`/test/delete/${id}`),

        async onMutate(deleteId) {
            await queryClient.cancelQueries({ queryKey: ['allTests'] });

            let deletedItem;

            queryClient.setQueriesData<AllTests[]>({ queryKey: ['allTests'] }, (old) => {
                deletedItem = old?.find(elem => elem.id === deleteId);
                return old ? old.filter(test => test.id !== deleteId) : [];
            })

            return { deletedItem }
        },
        onError() {
            queryClient.invalidateQueries({ queryKey: ['allTests'] })
            notify('error', 'Something went wrong, try again');
        },
        onSuccess(_, __, context) {
            if (context.deletedItem) {
                const { creator, name } = context.deletedItem;
                notify('success', `${creator} your test ${name} was deleted successfully`)
            }
        }

    });

    const handleDelete = async (id: string) => {
        const configNotification = {
            title: 'Are you sure you want to delete this test ?',
            text: 'This action cannot be undone.',
            icon: 'warning',
            btnText: 'Delete'
        } as const;

        await notifyDuringOperation(configNotification).then((result) => {
            if (result.isConfirmed) {
                deleteTestMutation.mutate(id)
            }
        });
    }

    return { handleDelete }
}

