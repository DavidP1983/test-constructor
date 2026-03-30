'use client';

import { useGetFolders } from "@/entities/flash/model/useGetFolders";
import { GeneralFlashType } from "@/entities/flash/types/flashTypes";
import { StudyList } from "@/entities/flash/ui/study/study-list/StudyList";
import { useFilterCards } from "@/features/flash/model/study/useFilterCards";
import { useUpdateStatusCardsMutation } from "@/features/flash/model/study/useUpdateStatusCardsMutation";
import { ResetAllFilters } from "@/features/flash/ui/study/reset-filters/ResetAllFilters";
import { StudyButton } from "@/features/flash/ui/study/study-button/StudyButton";
import { StudyFilters } from "@/features/flash/ui/study/study-filters/StudyFilters";
import { Difficulty } from "@/shared/types/select.types";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { FlashStudyHeader } from "./flash-study-header/FlashStudyHeader";
import { FlashCardSlider } from "./flash-study-slider/FlashCardSlider";

import styles from '@/styles/flashcard-block/flashcard.module.scss';

export type StateStudyFilterType = {
    status: string;
    difficulty?: Difficulty;
    limit?: 'all' | 10 | 20;
    sort?: 'shuffle' | 'default';
}

export const FlashCardStudy = ({ folderData }: { folderData: GeneralFlashType }) => {

    const { data } = useGetFolders();
    const folder = data.find(folder => folder._id === folderData._id) ?? folderData;
    const { updateCardStatusMutation, pending } = useUpdateStatusCardsMutation(folder._id);

    const [studyStep, setStudyStep] = useState(false);
    const [filters, setFilters] = useState<StateStudyFilterType>(
        {
            status: '',
            difficulty: undefined,
            limit: undefined,
            sort: undefined
        }
    );
    const [collectStatus, setCollectStatus] = useState<Record<string, "known" | "repeat">>({});
    const cards = folder.cards ?? [];

    const { filterResult } = useFilterCards(cards, filters);
    const isEmpty = filterResult.length === 0;


    /* Отправка измененных данных(status) на сервер при переходе к фильтрам  */
    const handleStudyButtonActions = async () => {
        const isDirty = Object.keys(collectStatus).length;
        if (isDirty) {
            await updateCardStatusMutation(collectStatus)
        }
        setStudyStep(prev => !prev)
        setCollectStatus({})
    }

    return (
        <section className={styles.flashcard} aria-labelledby="section-study">
            <div className="container">
                <FlashStudyHeader
                    folderData={folderData}
                    collectStatus={collectStatus} />
                <h1 className={clsx('title', styles.title__study)}>Flashcard Study {folder.title}</h1>

                <div className={styles.block__start}>
                    <StudyButton
                        pending={pending}
                        studyStep={studyStep}
                        isEmpty={isEmpty}
                        onClick={handleStudyButtonActions}
                    />
                    {isEmpty && <p className={styles.empty}>No cards to study</p>}
                </div>

                <AnimatePresence mode="wait">
                    {
                        !studyStep
                        && (
                            <motion.div
                                key="list"
                                initial={{ rotateY: 90, opacity: 0 }}
                                animate={{ rotateY: 0, opacity: 1 }}
                                exit={{ rotateY: -90, opacity: 0 }}
                                transition={{ duration: 0.4 }}>
                                <div className={styles.flashcard__actions}>
                                    <div className={clsx(styles.block__cards_wrapper, true && styles.open)}>
                                        <StudyList cards={filterResult} />
                                    </div>
                                    <div className={clsx(styles.block__editor_wrapper, true && styles.open)}>
                                        <div className={styles.block__filters}>
                                            <StudyFilters setFilters={setFilters} filters={filters} />
                                            <ResetAllFilters setFilters={setFilters} />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    {
                        studyStep
                        && (
                            <motion.div
                                key="slider"
                                initial={{ rotateY: 90, opacity: 0 }}
                                animate={{ rotateY: 0, opacity: 1 }}
                                exit={{ rotateY: -90, opacity: 0 }}
                                transition={{ duration: 0.4 }}>
                                <FlashCardSlider
                                    cards={filterResult}
                                    setCollectStatus={setCollectStatus}
                                    collectStatus={collectStatus} />
                            </motion.div>
                        )}
                </AnimatePresence>
            </div>
        </section >
    );
}


