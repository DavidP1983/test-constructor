/**
 * Updates existing test preserving meta fields (id, participantsCount).
 * Expects testMeta to be present.
 * Optimistic update
 */

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
    const router = useRouter();
    const queryClient = useQueryClient();

    const updateMutation = useMutation({
        mutationFn: async (data: AllTests) => await api.put(`builder/${testMeta?.id}`, data),

        onMutate: async (updatedTest) => {

            await queryClient.cancelQueries({
                queryKey: ['allTests']
            });

            const previousTest = queryClient.getQueryData(['allTests']);

            queryClient.setQueryData<AllTests[]>(['allTests'], (old) => {
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
            queryClient.setQueryData(['allTests'], context?.previousTest)
        },

        onSettled: () => queryClient.invalidateQueries({
            queryKey: ['allTests']
        })
    });

    const handleSaveEditTest = async () => {
        try {

            if (testMeta) {
                const now = new Date();
                const date = format(new Date(now), "dd.MM.yyy");
                const data = {
                    id: testMeta.id,
                    name: testMeta.name,
                    date,
                    participantsCount: testMeta.participantsCount,
                    test: test,
                    result: testMeta.result
                }

                await updateMutation.mutateAsync(data)
            }

        } catch (e) {
            if (e instanceof Error) {
                const errorTitle = e.message ? e.message : "Opps... something went wrong, try again";
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