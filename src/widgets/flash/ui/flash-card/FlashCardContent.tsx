'use client';

import { useFolderFormContext } from "@/features/flash/model/context/FolderFormContext";
import clsx from "clsx";
import { FlashcardCards } from "./flashcard-cards/FlashcardCards";
import { FlashCardsEditor } from "./flashcard-editor/FlashcardEditor";
import { FlashcardHeader } from "./flashcard-header/FlashcardHeader";

import styles from '@/styles/flashcard-block/flashcard.module.scss';


export const FlashCardContent = () => {
    const { isOpenFormEditor } = useFolderFormContext();

    return (
        <section className={styles.flashcard}>
            <div className="container">
                <FlashcardHeader />
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

