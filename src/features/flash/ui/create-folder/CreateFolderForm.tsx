'use client';

import { GeneralFlashType } from '@/entities/flash/types/flashTypes';
import { api } from '@/entities/test-operation/api/apiService';
import { useModal } from '@/shared/ui/modal/model/modal.store';
import { SpinnerForBtn } from '@/shared/ui/spinner/SpinnerForBtn';
import { notify } from '@/shared/utils/notify';
import styles from '@/styles/flashcard-block/flashdeck.module.scss';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';


type CreateFolderType<T> = Omit<T, 'id' | 'authorId' | 'createdAt' | '_id'>;

export const CreateFolderForm = () => {
    const queryClient = useQueryClient();
    const openModal = useModal(state => state.openModal)

    const [fieldsValue, setFieldsValue] = useState({
        title: '',
        abb: '',
        color: '#000000',
        desc: ''
    });


    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (data: CreateFolderType<GeneralFlashType>) => await api.post<GeneralFlashType[], CreateFolderType<GeneralFlashType>>('/flashcards/create-folder', data),

        async onSuccess(_, data) {
            await notify('success', `Folder ${data.title} was added successfully`);
            setFieldsValue({
                title: '',
                abb: '',
                color: '#000000',
                desc: ''
            });
            openModal(false);
        },
        async onError() {
            await notify('error', 'An error occurred while saving, try again');
        },
        async onSettled() {
            await queryClient.invalidateQueries({
                queryKey: ['flashCards']
            });
        }
    })

    const handleInputData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.currentTarget;

        setFieldsValue(prev => ({ ...prev, [name]: value }));
    }

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!fieldsValue.title || !fieldsValue.abb) return

        const res = {
            title: fieldsValue.title,
            abb: fieldsValue.abb,
            color: fieldsValue.color,
            description: fieldsValue.desc
        }

        console.log(res)
        await mutateAsync(res);
    }

    return (

        <form className={styles.deck__form} onSubmit={handleFormSubmit}>
            <div className={styles.deck__form_field}>
                <label htmlFor="name">Folder title</label>
                <input
                    className={styles.input}
                    value={fieldsValue.title}
                    onChange={handleInputData}
                    type="text"
                    id="title"
                    name="title"
                    required
                    placeholder="type folder title..." />
            </div>
            <div className={styles.deck__form_field}>
                <label htmlFor="name">Folder abbreviation</label>
                <input
                    className={styles.input}
                    value={fieldsValue.abb}
                    onChange={handleInputData}
                    type="text"
                    id="abb"
                    name="abb"
                    maxLength={4}
                    required
                    placeholder="max 4 symbols available" />
            </div>
            <div className={styles.deck__form_field}>
                <label htmlFor="name">Folder color</label>
                <input
                    className={styles.input}
                    value={fieldsValue.color}
                    onChange={handleInputData}
                    type="color"
                    id="color"
                    name="color"
                    required
                    placeholder="Select folder color" />
            </div>
            <div className={styles.deck__form_field}>
                <label htmlFor="name">Folder description</label>
                <input
                    className={styles.input}
                    value={fieldsValue.desc}
                    onChange={handleInputData}
                    type="text"
                    id="desc"
                    name="desc"
                    required
                    placeholder="Short description optional" />
            </div>
            <button
                className={styles.deck__form_btn}
                type="submit"
                disabled={isPending}>
                {isPending ? <>Submitting... <SpinnerForBtn /></> : 'Submit form'}
            </button>
        </form>
    )
}