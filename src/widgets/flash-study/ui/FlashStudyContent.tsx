'use client';

import { GeneralFlashType } from "@/entities/flash-folder/model/types/folder.types";
import clsx from "clsx";
import { useState } from "react";
import { CollectStatusType } from "../model/types/flash.study.types";
import { FlashStudyHeader } from "./FlashStudyHeader";
import { StudyViewContainer } from "./StudyViewContainer";

import styles from '@/styles/flashcard-block/flashcard.module.scss';

export const FlashStudyContent = ({ folderData }: { folderData: GeneralFlashType }) => {
    const [collectStatus, setCollectStatus] = useState<CollectStatusType>({});

    return (
        <section className={styles.flashcard} aria-labelledby="section-study">
            <div className="container">
                <FlashStudyHeader
                    folderData={folderData}
                    collectStatus={collectStatus} />
                <h1 className={clsx('title', styles.title__study)}>Flashcard Study {folderData.title}</h1>

                <StudyViewContainer
                    folderData={folderData}
                    setCollectStatus={setCollectStatus}
                    collectStatus={collectStatus} />
            </div>
        </section >
    );
}


