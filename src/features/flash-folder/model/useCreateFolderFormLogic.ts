'use client';

import { queries } from "@/entities/flash-folder";
import { GeneralFlashType } from "@/entities/flash-folder/model/types/folder.types";
import { api } from "@/entities/test-operation/api/apiService";
import { useModal } from "@/shared/ui/modal/model/modal.store";
import { notify } from "@/shared/utils/notify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

type CreateFolderType<T> = Omit<T, 'id' | 'authorId' | 'createdAt' | '_id'>;

export const useCreateFolderFormLogic = () => {

    const queryClient = useQueryClient();
    const openModal = useModal(state => state.openModal)

    const [fieldsValue, setFieldsValue] = useState({
        title: '',
        abb: '',
        color: '#000000',
        desc: '',
        tag: ''
    });


    const { mutate, isPending } = useMutation({
        mutationFn: async (data: CreateFolderType<GeneralFlashType>) => await api.post<GeneralFlashType[], CreateFolderType<GeneralFlashType>>('/flashcards/create-folder', data),

        async onSuccess(_, data) {
            await notify('success', `Folder ${data.title} was added successfully`);
            setFieldsValue({
                title: '',
                abb: '',
                color: '#000000',
                desc: '',
                tag: ''
            });
            openModal(false);
        },
        async onError() {
            await notify('error', 'An error occurred while saving, try again');
        },
        async onSettled() {
            await queryClient.invalidateQueries({ ...queries.mutationKey() });
        }
    })

    const handleInputData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.currentTarget;
        setFieldsValue(prev => ({ ...prev, [name]: value }));
    }

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!fieldsValue.title || !fieldsValue.abb) return

        const res = {
            title: fieldsValue.title,
            abb: fieldsValue.abb,
            color: fieldsValue.color,
            description: fieldsValue.desc,
            tag: fieldsValue.tag
        }
        mutate(res);
    }

    return {
        handleInputData,
        handleFormSubmit,
        fieldsValue,
        isPending
    }
}