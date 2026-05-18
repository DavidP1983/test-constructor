import { FlashCardsType } from "@/entities/flash-card/model/types/card.types"
import { GeneralFlashType } from "@/entities/flash-folder/model/types/folder.types"

export type FlashCardState = Partial<FlashCardsType>
export type FlashFolderState = Partial<GeneralFlashType>

export const defaultCardFieldsData: FlashCardState = {
    question: '',
    answer: '',
    difficulty: undefined,
    lang: undefined,
    type: undefined,
    example: null,
    img: null,
}

export const defaultCardFieldsFolderData: FlashFolderState = {
    title: '',
    description: ''
}