/**
 * Updates existing test preserving meta fields (id, participantsCount).
 * Expects testMeta to be present.
 * Optimistic update
 */

import { useLoginForm } from "@/features/auth/login/model/store";
import { notifyAfterSaveTest } from "@/features/test-actions/save-question/lib/utils/notifyAfterSaveTest";
import { useTest } from "@/features/test-actions/save-question/model/store";
import { AllTests, TestMeta } from "@/shared/types/test-type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { api } from "../api/apiService";

export const useEditTest = (testMeta: TestMeta | null) => {
    const test = useTest(state => state.test);
    const resetTest = useTest(state => state.resetTest);
    const id = useLoginForm(state => state.userData?.id);

    const router = useRouter();
    const queryClient = useQueryClient();

    type UpdateType<T> = Partial<T>;
    const updateMutation = useMutation({
        mutationFn: async (data: UpdateType<AllTests>) => await api.patch<AllTests[], UpdateType<AllTests>>(`/test/update`, data),

        onMutate: async (updatedTest) => {

            await queryClient.cancelQueries({
                queryKey: ['allTests', id, null]
            });

            const previousTest = queryClient.getQueryData(['allTests', id]);

            queryClient.setQueryData<AllTests[]>(['allTests', id, null], (old) => {
                if (!old) return []
                const updatedData = old.map(test => test.id === updatedTest.id ? { ...test, ...updatedTest } : test)
                return {
                    ...old,
                    updatedData
                }
            });
            return { previousTest }
        },

        onSuccess: async (_, data) => {
            const successTitle = `Your test ${data.name} was updated successfully`;
            await notifyAfterSaveTest("success", successTitle);
            router.push('/builder');
            resetTest();
        },

        onError: (_, __, context) => {
            queryClient.setQueryData(['allTests', id, null], context?.previousTest)
        },

        onSettled: () => queryClient.invalidateQueries({
            queryKey: ['allTests', id, null]
        })
    });

    const handleSaveEditTest = async () => {
        try {

            if (testMeta) {
                const data = {
                    id: testMeta.id,
                    name: testMeta.name,
                    test: test,
                }

                await updateMutation.mutateAsync(data)
            }

        } catch (e) {
            if (e instanceof Error) {
                const errorTitle = "Opps... something went wrong, try again";
                console.error(errorTitle)
                notifyAfterSaveTest('error', errorTitle)

            }
        }
    }



    return {
        handleSaveEditTest,
        isPendingEdit: updateMutation.isPending
    }

}