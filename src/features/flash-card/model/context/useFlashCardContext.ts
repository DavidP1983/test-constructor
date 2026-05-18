import { useContext } from "react";
import { FlashCardContext } from "./FlashCardContext";

export const useFlashCardContext = () => {
    const context = useContext(FlashCardContext)

    if (!context) {
        throw new Error('useFlashCardContext must be used within FlashCardProvider')
    }
    return context;
}