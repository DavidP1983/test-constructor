'use client';
import { GeneralFlashType } from "@/entities/flash-folder/model/types/folder.types";
import { notify } from "@/shared/utils/notify";
import { notifyDuringOperation } from "@/shared/utils/notifyDuringOperation";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { useShallow } from "zustand/shallow";
import { useCreateMutation, useDeleteCardMutation, useUpdateCardMutation, useUpdateFolderMutation } from "../services";
import { useFlashCardStore } from "../store";


export const useUpsertMutations = (folderData: GeneralFlashType, mode: "create" | "edit") => {
    const router = useRouter();
    const {
        cardFieldsData,
        cardFieldsFolderData,
        cardId,
        setIsDirty,
        isDirty,
        setCurrentCardIndex,
        clearCardFields } = useFlashCardStore(useShallow((state) => ({
            cardFieldsData: state.cardFieldsData,
            cardFieldsFolderData: state.cardFieldsFolderData,
            cardId: state.cardId,
            setIsDirty: state.setIsDirty,
            isDirty: state.isDirty,
            clearCardFields: state.clearCardFields,
            setCurrentCardIndex: state.setCurrentCardIndex
        })));

    const { createMutation, isPendingCreate } = useCreateMutation(folderData._id);
    const { updateCardMutation, isPendingUpdate } = useUpdateCardMutation(folderData._id, cardId)
    const { deleteCardMutation, isPendingDelete } = useDeleteCardMutation(folderData._id);
    const { updateFolderMutation } = useUpdateFolderMutation(folderData._id);


    /* Отправка данных на сервер */
    const saveAll = async () => {
        const promises = [];

        const hasFolderUnsavedChanges =
            cardFieldsFolderData.title !== folderData.title ||
            cardFieldsFolderData.description !== folderData.description;

        const hasCardUnsavedChanges =
            cardFieldsData.question &&
            cardFieldsData.answer &&
            cardFieldsData.difficulty !== undefined;

        if (hasCardUnsavedChanges && cardId === '' && mode === 'create') {
            promises.push(createMutation(cardFieldsData));
        }

        if (hasCardUnsavedChanges && cardId !== '' && mode === 'create') {
            promises.push(updateCardMutation(cardFieldsData));
        }

        if (hasFolderUnsavedChanges && mode === 'edit') {
            promises.push(updateFolderMutation(cardFieldsFolderData));
        }


        if (hasCardUnsavedChanges && cardId !== '' && mode === 'edit') {
            promises.push(updateCardMutation(cardFieldsData));
        }

        const result = await Promise.allSettled(promises);

        const errors = result
            .filter(r => r.status === 'rejected')
            .map((r, i) => {
                const reason = (r as PromiseRejectedResult).reason;
                return `Operation #${i + 1}: ${reason?.message || reason}`;
            });

        if (errors.length) {
            notify('error', `Some operation failed:\n + ${errors.join('\n')}`);
        } else {
            await notify("success", `Your folder ${folderData.title} was updated successfully`);
            setIsDirty(false);
            clearCardFields();
            setCurrentCardIndex(0);
        }
    };



    const handleUpsert = async (signal: 'form' | 'link', e?: FormEvent) => {
        e?.preventDefault();

        if (!isDirty && signal === 'link') {
            router.push('/flashcard');
            clearCardFields();
            setCurrentCardIndex(0);
            return;
        }
        const configNotification = {
            title: 'You have unsaved changes in this folder',
            text: 'Please save your changes before leaving, or they will be lost.',
            icon: 'warning',
            btnText: 'Apply changes'
        } as const;


        if (signal === 'form' && isDirty) {
            await saveAll();
            return;
        }

        if (signal === 'link' && isDirty) {
            const result = await notifyDuringOperation(configNotification);
            if (result.isConfirmed) {
                await saveAll();
                router.push('/flashcard');
                return;
            }
        }
    };

    return {
        isPendingCreate,
        isPendingUpdate,
        isPendingDelete,
        deleteCardMutation,
        handleUpsert
    }
}