'use client';

import { useFolderFormContext } from "@/features/flash/model/context/FolderFormContext";
import clsx from "clsx";
import { FlashcardCards } from "./flashcard-cards/FlashcardCards";
import { FlashCardsEditor } from "./flashcard-editor/FlashcardEditor";
import { FlashcardHeader } from "./flashcard-header/FlashcardHeader";

import { BackToFlashcardsButton } from "@/features/flash/ui/card/back-button/BackToFlashcardsButton";
import { EditFolder } from "@/features/flash/ui/card/edit-folder/EditFolder";
import { StudyButton } from "@/features/flash/ui/card/study-button/StudyCards";
import { UnsavedIndicator } from "@/shared/ui/unsavedIndicator/UnsavedIndicator";
import styles from '@/styles/flashcard-block/flashcard.module.scss';

export const FlashCardContent = () => {
    const { isOpenFormEditor, isDirty } = useFolderFormContext();

    return (
        <section className={styles.flashcard} aria-labelledby="section-flashcard">
            <div className="container">
                <FlashcardHeader backButtonElement={<BackToFlashcardsButton />}>
                    <EditFolder />
                    <UnsavedIndicator indicator={isDirty} />
                    <StudyButton />
                </FlashcardHeader>
                <div className={styles.flashcard__actions}>

                    <div className={clsx(styles.block__cards_wrapper, isOpenFormEditor && styles.open)}>
                        <FlashcardCards />
                    </div>

                    <div className={clsx(styles.block__editor_wrapper, isOpenFormEditor && styles.open)}>
                        <FlashCardsEditor />
                    </div>

                </div>
            </div>
        </section>
    );

}

