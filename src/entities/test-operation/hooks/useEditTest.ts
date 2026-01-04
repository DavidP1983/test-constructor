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
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { api } from "../api/apiService";


export const useEditTest = (testMeta: TestMeta | null) => {
    const test = useTest(state => state.test);
    const resetTest = useTest(state => state.resetTest);
    const id = useLoginForm(state => state.userData?.id);
    const router = useRouter();
    const queryClient = useQueryClient();

    const updateMutation = useMutation({
        mutationFn: async (data: AllTests) => await api.put<AllTests[], AllTests>(`builder/${testMeta?.id}`, data),

        onMutate: async (updatedTest) => {

            await queryClient.cancelQueries({
                queryKey: ['allTests', id, null]
            });

            const previousTest = queryClient.getQueryData(['allTests']);

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
                const now = new Date();
                const createdAt = format(new Date(now), "yyyy-MM-dd");
                const data = {
                    id: testMeta.id,
                    authorId: testMeta.authorId,
                    name: testMeta.name,
                    createdAt,
                    participantsCount: testMeta.participantsCount,
                    test: test,
                    result: testMeta.result
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