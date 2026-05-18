import { GeneralFlashType } from "@/entities/flash-folder/model/types/folder.types";
import { notifyDuringOperation } from "@/shared/utils/notifyDuringOperation";
import { useShallow } from "zustand/shallow";
import { useFlashCardStore } from "../store";
import { FlashSelectType } from "../types/select.types";

export const useCardForm = (mode: "create" | "edit", folderData: GeneralFlashType) => {
    const {
        cardFieldsData,
        setCardFieldsFormData,
        setCardFieldsFolderData,
        setIsDirty,
        clearCardFields,
        cardId
    } = useFlashCardStore(useShallow((state) => ({
        cardFieldsData: state.cardFieldsData,
        setIsDirty: state.setIsDirty,
        setCardFieldsFormData: state.setCardFieldsFormData,
        setCardFieldsFolderData: state.setCardFieldsFolderData,
        clearCardFields: state.clearCardFields,
        cardId: state.cardId
    })));

    /*Сбор данных полей компонента CardForm*/
    const handleCardFormInputData = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setCardFieldsFormData({ [name]: value })
        setIsDirty(true);
    };

    /* Добавил ф-нал по сбору данных поля TextEditor, поскольку при сохранении данных они менялись, что в свою очередь трегирилла данную ф-ию и приводила к появлению индикатора несохраненных данных, при сохранении */
    const handleTextEditorChange = (name: 'answer', value: string) => {
        const currentValue = cardFieldsData[name];

        if (currentValue === value) return;
        setCardFieldsFormData({ [name]: value });
        setIsDirty(true);
    };

    const handleCardFormSelectData = (name: FlashSelectType, value: string | number) => {
        setCardFieldsFormData({ [name]: value });
        setIsDirty(true);
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
            clearCardFields();
        } else {
            setCardFieldsFormData({
                question: originCardData?.question,
                answer: originCardData?.answer,
                difficulty: originCardData?.difficulty,
                lang: originCardData?.lang,
                type: originCardData?.type,
                example: originCardData?.example,
                img: originCardData?.img
            });
        }
        setCardFieldsFolderData({
            title: folderData.title ?? '',
            description: folderData.description ?? ''
        });
        setIsDirty(false);
    };



    return {
        handleCardFormInputData,
        handleCardFormSelectData,
        handleTextEditorChange,
        handleDiscardChanges
    }
}