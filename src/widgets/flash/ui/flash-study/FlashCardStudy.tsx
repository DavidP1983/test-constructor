'use client';

import { useGetFolders } from "@/entities/flash/model/useGetFolders";
import { GeneralFlashType } from "@/entities/flash/types/flashTypes";
import { useFilterCards } from "@/features/flash/model/study/useFilterCards";
import { StudyButton } from "@/features/flash/ui/study/study-button/StudyButton";
import { Difficulty } from "@/shared/types/select.types";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useStudyStep } from "../../model/useStudyStep";
import { FlashStudyHeader } from "./flash-study-header/FlashStudyHeader";
import { FlashCardSlider } from "./flash-study-slider/FlashCardSlider";
import { StudyView } from "./flash-study-view/StudyView";

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
    const {
        studyStep,
        pending,
        handleStudyButtonActions,
        collectStatus,
        setCollectStatus
    } = useStudyStep(folder._id);
    const [filters, setFilters] = useState<StateStudyFilterType>(
        {
            status: '',
            difficulty: undefined,
            limit: undefined,
            sort: undefined
        }
    );

    const cards = folder.cards ?? [];
    const { filterResult } = useFilterCards(cards, filters);
    const isEmpty = filterResult.length === 0;


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

                <AnimatePresence mode='wait'>
                    {
                        !studyStep
                        && (
                            <motion.div
                                key="list"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.4 }}>
                                <StudyView
                                    cards={cards}
                                    filters={filters}
                                    setFilters={setFilters}
                                    filterResult={filterResult}
                                />
                            </motion.div>
                        )}
                    {
                        studyStep
                        && (
                            <motion.div
                                key="slider"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
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


