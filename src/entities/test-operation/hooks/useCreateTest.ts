/**
 * Creates new test and resets store on success.
 * Used only in create mode.
 * Pessimistic update
 */

import { useLoginForm } from "@/features/auth/login/model/store";
import { notifyAfterSaveTest } from "@/features/test-actions/save-question/lib/utils/notifyAfterSaveTest";
import { notifyBeforeSaveTest } from "@/features/test-actions/save-question/lib/utils/notifyBeforeSaveTest";
import { notifyDuringDecline } from "@/features/test-actions/save-question/lib/utils/notifyDuringDecline";
import { useTest } from "@/features/test-actions/save-question/model/store";
import { AllTests } from "@/shared/types/test-type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from 'next/navigation';
import Swal from "sweetalert2";
import { v4 as uuidv4 } from 'uuid';
import { useShallow } from "zustand/shallow";
import { api } from "../api/apiService";


export const useCreateTest = () => {
    const { test, resetTest, setTotalCreatedTests } = useTest(useShallow((state) => ({
        test: state.test,
        resetTest: state.resetTest,
        setTotalCreatedTests: state.setTotalCreatedTests,
    })));
    const id = useLoginForm(state => state.userData?.id);

    const router = useRouter();
    const queryClient = useQueryClient();

    type CreateType<T> = Omit<T, 'authorId' | 'createdAt'>;
    const createMutation = useMutation({
        mutationFn: async (data: CreateType<AllTests>) => await api.post<AllTests[], CreateType<AllTests>>(`/test/create`, data),

        async onSuccess(_, data) {
            const successTitle = `Your test ${data.name} was added successfully`;
            await notifyAfterSaveTest("success", successTitle);
            router.push('/builder');
            resetTest();
        },
        async onSettled() {
            await queryClient.invalidateQueries({
                queryKey: ['allTests', id, null]
            });
        },
    });

    const handleSaveTest = async () => {

        try {
            const testName = await notifyBeforeSaveTest();

            if (!testName) {
                throw new Error(`Decline, name ${testName}`)
            }

            const data = {
                id: uuidv4(),
                name: testName,
                participantsCount: 0,
                test: test,
                result: { totalQuestions: test.length, answers: 0 }

            }

            await createMutation.mutateAsync(data);
            setTotalCreatedTests(1);
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
                        router.push('/builder');
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