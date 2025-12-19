/**
 * Creates new test and resets store on success.
 * Used only in create mode.
 * Pessimistic update
 */

import { notifyAfterSaveTest } from "@/features/test-actions/save-question/lib/utils/notifyAfterSaveTest";
import { notifyBeforeSaveTest } from "@/features/test-actions/save-question/lib/utils/notifyBeforeSaveTest";
import { notifyDuringDecline } from "@/features/test-actions/save-question/lib/utils/notifyDuringDecline";
import { useTest } from "@/features/test-actions/save-question/model/store";
import { AllTests } from "@/shared/types/test-type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { useRouter } from 'next/navigation';
import Swal from "sweetalert2";
import { v4 as uuidv4 } from 'uuid';
import { api } from "../api/apiService";


export const useCreateTest = () => {
    const test = useTest(state => state.test);
    const resetTest = useTest(state => state.resetTest);
    const router = useRouter();
    const queryClient = useQueryClient();

    const createMutation = useMutation({
        mutationFn: async (data: AllTests) => await api.post("tests", data),

        async onSuccess(_, data) {
            const successTitle = `Your test ${data.name} was added successfully`;
            await notifyAfterSaveTest("success", successTitle);
            router.push('/profile');
            resetTest();
        },
        async onSettled() {
            await queryClient.invalidateQueries({
                queryKey: ['allTests']
            });
        },
    });

    const handleSaveTest = async () => {

        try {
            const testName = await notifyBeforeSaveTest();

            if (!testName) {
                throw new Error(`Decline, name ${testName}`)
            }

            const now = new Date();
            const date = format(new Date(now), "dd.MM.yyy");
            const data = {
                id: uuidv4(),
                name: testName,
                date,
                participantsCount: 0,
                test: test,
                result: { totalQuestions: test.length, answers: 0 }

            }

            await createMutation.mutateAsync(data)
        } catch (e) {
            if (e instanceof Error) {
                const errorTitle = e.message ? e.message : "Opps... something went wrong, try again";
                console.error(errorTitle)
                notifyAfterSaveTest('error', errorTitle)

            }
        }
    }

    const handleDecline = async () => {
        await notifyDuringDecline().then((result) => {
            if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info").then((res) => {
                    resetTest();
                    if (res.isConfirmed) {
                        router.push('/profile');
                    }
                });

            }
        });
    }

    return {
        handleSaveTest,
        handleDecline,
        isPending: createMutation.isPending
    }
}