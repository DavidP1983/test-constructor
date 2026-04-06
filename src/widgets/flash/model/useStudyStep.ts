import { useUpdateStatusCardsMutation } from "@/features/flash/model/study/useUpdateStatusCardsMutation";
import { useState } from "react";

export const useStudyStep = (id: string) => {
    const [collectStatus, setCollectStatus] = useState<Record<string, "known" | "repeat">>({});
    const [studyStep, setStudyStep] = useState(false);
    const { updateCardStatusMutation, pending } = useUpdateStatusCardsMutation(id);


    /* Отправка измененных данных(status) на сервер при переходе к фильтрам  */
    const handleStudyButtonActions = async () => {
        const isDirty = Object.keys(collectStatus).length > 0;
        if (isDirty) {
            await updateCardStatusMutation(collectStatus)
        }
        setStudyStep(prev => !prev)
        setCollectStatus({})
    }

    return {
        studyStep,
        pending,
        handleStudyButtonActions,
        collectStatus,
        setCollectStatus
    }
}