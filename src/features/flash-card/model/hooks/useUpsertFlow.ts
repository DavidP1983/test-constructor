'use client';
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";
import { useFlashCardContext } from "../context";
import { useFlashCardStore } from "../store";
import { useCardForm } from "./useCardForm";
import { useEditFolderData } from "./useEditFolderData";
import { useSearchCardItem } from "./useSearchCardItem";
import { useUpsertMutations } from "./useUpsertMutations";

export const useUpsertFlow = () => {
    const { mode, folderData } = useFlashCardContext();
    const { searchQuestion, setCardFieldsFolderData } = useFlashCardStore(useShallow((state) => ({
        searchQuestion: state.searchQuestion,
        cardId: state.cardId,
        setCardFieldsFolderData: state.setCardFieldsFolderData
    })));


    useEffect(() => {
        if (!folderData) return;
        setCardFieldsFolderData({
            title: folderData.title ?? '',
            description: folderData.description ?? ''
        });
    }, [folderData, setCardFieldsFolderData]);

    /* Hooks */
    const { handleEditFolderData } = useEditFolderData(); /* Данные  идут в EditorFolderMeta */
    const { cards } = useSearchCardItem(searchQuestion, folderData); /* Для фильтрации карточек SearchCardItems*/
    const {
        handleCardFormInputData,
        handleCardFormSelectData,
        handleTextEditorChange,
        handleDiscardChanges } = useCardForm(mode, folderData);

    /* Services */
    const {
        isPendingCreate,
        isPendingUpdate,
        isPendingDelete,
        deleteCardMutation,
        handleUpsert
    } = useUpsertMutations(folderData, mode);


    return {
        folderData,
        mode,
        cards,
        isPendingCreate,
        isPendingUpdate,
        isPendingDelete,
        deleteCardMutation,
        handleUpsert,
        handleEditFolderData,
        handleCardFormInputData,
        handleCardFormSelectData,
        handleTextEditorChange,
        handleDiscardChanges
    }
}