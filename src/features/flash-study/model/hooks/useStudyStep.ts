'use client';
import { useFlashCardStore } from "@/features/flash-card";
import { CollectStatusProps } from "@/widgets/flash-study/model/types/flash.study.types";
import { useState } from "react";
import { useUpdateStatusMutation } from "../services";


export const useStudyStep = (id: string, status: CollectStatusProps) => {
    const [isStudy, setIsStudy] = useState(false);
    const { updateCardStatusMutation, pending } = useUpdateStatusMutation(id);
    const { collectStatus, setCollectStatus } = status;
    const setCurrentCardIndex = useFlashCardStore((state) => state.setCurrentCardIndex);


    /* Отправка измененных данных(status) на сервер при переходе к фильтрам  */
    const handleSaveStudyActions = async () => {
        const isDirty = Object.keys(collectStatus).length > 0;
        if (isDirty) {
            await updateCardStatusMutation(collectStatus);
        }
        setIsStudy(prev => !prev);
        setCollectStatus({});
        setCurrentCardIndex(0);
    }

    return {
        isStudy,
        pending,
        handleSaveStudyActions,
    }
}