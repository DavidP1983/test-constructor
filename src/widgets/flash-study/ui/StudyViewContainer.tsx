import { GeneralFlashType } from "@/entities/flash-folder/model/types/folder.types";
import { StudyButton, useFlashcardFilters, useStudyStep } from "@/features/flash-study";
import { AnimatePresence } from "motion/react";
import { CollectStatusProps } from "../model/types/flash.study.types";
import { FlashCardSlider } from "./FlashCardSlider";
import { StudyWorkspace } from "./StudyWorkspace";


export interface Props extends CollectStatusProps {
    folderData: GeneralFlashType;
}

export const StudyViewContainer = ({ folderData, setCollectStatus, collectStatus }: Props) => {

    const cards = folderData.cards ?? [];

    const {
        isStudy,
        pending,
        handleSaveStudyActions,
    } = useStudyStep(folderData._id, { collectStatus, setCollectStatus });

    const { filters, setFilters, isEmpty, filterResult } = useFlashcardFilters(cards);


    return (
        <>
            <StudyButton
                pending={pending}
                studyStep={isStudy}
                isEmpty={isEmpty}
                onClick={handleSaveStudyActions}
            />
            <AnimatePresence mode='wait'>
                {
                    isStudy ?
                        <FlashCardSlider
                            cards={filterResult}
                            setCollectStatus={setCollectStatus}
                            collectStatus={collectStatus} />
                        :
                        <StudyWorkspace
                            cards={cards}
                            filters={filters}
                            setFilters={setFilters}
                            filterResult={filterResult}
                        />
                }
            </AnimatePresence>
        </>
    );
}