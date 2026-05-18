import { useShallow } from "zustand/shallow";
import { useFlashCardStore } from "../store/flashcard.store";

export const useEditFolderData = () => {

    const { setIsDirty, setCardFieldsFolderData } = useFlashCardStore(useShallow((state) => ({
        setIsDirty: state.setIsDirty,
        setCardFieldsFolderData: state.setCardFieldsFolderData
    })));


    /*Сбор данных полей компонента EditorFolderMeta*/
    const handleEditFolderData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCardFieldsFolderData({ [name]: value });
        setIsDirty(true);
    };

    return {
        handleEditFolderData
    }
}