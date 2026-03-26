'use client';

import { FlashCardsType, GeneralFlashType } from "@/entities/flash/types/flashTypes";
import { notify } from "@/shared/utils/notify";
import { notifyDuringOperation } from "@/shared/utils/notifyDuringOperation";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { FlashSelectType } from "../../types/flash-types";
import useCreateMutation from "./useCreateMutation";
import useDeleteCardMutation from "./useDeleteCardMutation";
import useUpdateCardMutation from "./useUpdateCardMutation";
import useUpdateFolderMutation from "./useUpdateFolderMutation";


export const useUpsertFolder = (folderData: GeneralFlashType, mode: 'create' | 'edit') => {
    const [folderEditData, setFolderEditData] = useState(
        {
            title: folderData?.title ?? '',
            description: folderData?.description ?? ''
        });

    const [isDirty, setIsDirty] = useState(false);
    const [isOpenFormEditor, setIsOpenFormEditor] = useState(false);
    const [formFieldsData, setFormFieldsData] = useState<Partial<FlashCardsType>>({
        question: '',
        answer: '',
        difficulty: undefined,
        type: undefined,
        example: null,
        img: null,
    });

    /* Для пагинации между вопросами карточек в FlashCardsEditor и CardList */
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [cardId, setCardId] = useState('');

    /* Для фильтрации карточек в SearchCards / useSearchCard*/
    const [searchQuestion, setSearchQuestion] = useState('');

    const router = useRouter();

    /* Мутации */
    const { createMutation, isPendingCreate } = useCreateMutation(folderData._id);
    const { updateFolderMutation } = useUpdateFolderMutation(folderData._id);
    const { updateCardMutation, isPendingUpdate } = useUpdateCardMutation(folderData._id, cardId);
    const { deleteCardMutation } = useDeleteCardMutation(folderData._id);


    /*Сбор данных полей компонента EditFolder*/
    const handleEditFolderData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFolderEditData(prev => ({ ...prev, [name]: value }));
        setIsDirty(true);
    };

    /*Отображение формы при клике на кнопку компонента AddCard*/
    const handleOpenFormEditor = () => {
        setIsOpenFormEditor(!isOpenFormEditor);
    };


    /*Сбор данных полей компонента CardForm*/
    const handleCardFormInputData = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormFieldsData(prev => ({ ...prev, [name]: value }));
        setIsDirty(true);
    };

    /* Добавил ф-нал по сбору данных поля TextEditor, поскольку при сохранении данных они менялись, что в свою очередь трегирилла данную ф-ию и приводила к появлению индикатора несохраненных данных, при сохранении */
    const handleTextEditorChange = (name: 'answer', value: string) => {
        setFormFieldsData(prev => {
            if (prev[name] === value) return prev;

            setIsDirty(true);
            return ({ ...prev, [name]: value })
        });
    };

    const handleCardFormSelectData = (name: FlashSelectType, value: string | number) => {
        setFormFieldsData(prev => ({ ...prev, [name]: value }));
        setIsDirty(true);
    };


    /* Ф-ия, которая собирает данные выбранной карточки и их отображения в полях формы для последующего редактирования -> в CardList, FlashCardsEditor */
    const handleEditCard = (cardData: FlashCardsType) => {
        setFormFieldsData({
            question: cardData.question,
            answer: cardData.answer,
            difficulty: cardData.difficulty,
            type: cardData.type,
            example: cardData.example,
            img: cardData.img
        });
        setCardId(cardData._id);
    };

    /* Ф-ия по отмене изменений */
    const handleDiscardChanges = async () => {
        const configNotification = {
            title: 'Discard unsaved changes?',
            text: 'If you discard now, all edits in this card will be lost. Do you want to continue?',
            icon: 'warning',
            btnText: 'Keep editing'
        } as const;
        const result = await notifyDuringOperation(configNotification);
        if (result.isConfirmed) {
            return;
        }
        const originCardData = folderData?.cards?.find(c => c._id === cardId);
        if (mode === 'create') {
            setFormFieldsData({
                question: '',
                answer: '',
                difficulty: undefined,
                type: undefined,
                example: null,
                img: null,
            });
        } else {
            setFormFieldsData({
                question: originCardData?.question,
                answer: originCardData?.answer,
                difficulty: originCardData?.difficulty,
                type: originCardData?.type,
                example: originCardData?.example,
                img: originCardData?.img
            });
        }
        setFolderEditData({
            title: folderData.title ?? '',
            description: folderData.description ?? ''
        });
        setIsDirty(false);
    };


    /* Удаление карточки из списка */
    const handleDeleteCard = (id: string) => {
        deleteCardMutation(id);
        setFormFieldsData({
            question: '',
            answer: '',
            difficulty: undefined,
            type: undefined,
            example: null,
            img: null,
        });
    };


    /* Отправка данных на сервер */
    const saveAll = async () => {
        const promises = [];

        const hasFolderUnsavedChanges =
            folderEditData.title !== folderData.title ||
            folderEditData.description !== folderData.description;

        const hasCardUnsavedChanges =
            formFieldsData.question &&
            formFieldsData.answer &&
            formFieldsData.difficulty !== undefined;

        if (hasCardUnsavedChanges && cardId === '' && mode === 'create') {
            promises.push(createMutation(formFieldsData));
        }

        if (hasCardUnsavedChanges && cardId !== '' && mode === 'create') {
            promises.push(updateCardMutation(formFieldsData));
        }

        if (hasFolderUnsavedChanges && mode === 'edit') {
            promises.push(updateFolderMutation(folderEditData));
        }


        if (hasCardUnsavedChanges && cardId !== '' && mode === 'edit') {
            promises.push(updateCardMutation(formFieldsData));
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
            setFormFieldsData({
                question: '',
                answer: '',
                difficulty: undefined,
                type: undefined,
                example: null,
                img: null,
            });
        }
    };



    const handleUpsert = async (signal: 'form' | 'link', e?: FormEvent) => {
        e?.preventDefault();

        if (!isDirty && signal === 'link') {
            router.push('/flashcard');
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
        folderData,
        mode,
        folderEditData,
        isDirty,
        isOpenFormEditor,
        handleEditFolderData,
        handleOpenFormEditor,
        formFieldsData,
        setFormFieldsData,
        cardId,
        currentCardIndex,
        searchQuestion,
        setCurrentCardIndex,
        setSearchQuestion,
        handleCardFormInputData,
        handleCardFormSelectData,
        handleTextEditorChange,
        handleUpsert,
        handleEditCard,
        handleDiscardChanges,
        handleDeleteCard,
        isPendingCreate,
        isPendingUpdate
    }
}


