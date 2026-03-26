'use client';

import { useFolderFormContext } from "@/features/flash/model/context/FolderFormContext";
import { EditFolder } from "@/features/flash/ui/card/edit-folder/EditFolder";
import { StudyCards } from "@/features/flash/ui/card/study-cards/StudyCards";
import { UnsavedIndicator } from "@/shared/ui/unsavedIndicator/UnsavedIndicator";

import styles from '@/styles/flashcard-block/flashcard.module.scss';


export const FlashcardHeader = () => {
    const { handleUpsert, isDirty } = useFolderFormContext();

    return (
        <div className={styles.flashcard__breadcrumb}>
            <div className={styles.flashcard__breadcrumb_link}>
                <button
                    className={styles.back}
                    onClick={() => handleUpsert('link')}
                    title={isDirty ? 'You have unsaved changes' : ''}>
                    <span className="icon-left-open"></span>
                    FlashCards
                </button>
                <div className={styles.divider}></div>
            </div>
            <EditFolder />
            <UnsavedIndicator indicator={isDirty} />
            <StudyCards />
        </div>
    );
}