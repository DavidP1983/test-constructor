import {
    BackToFlashDeckButton,
    EditorFolderMeta,
    FlashCardEditor,
    StudyButton,
    useFlashCardContext,
    useFlashCardStore,
} from "@/features/flash-card";
import { FlashHeader } from "@/shared/ui";
import { UnsavedIndicator } from "@/shared/ui/unsavedIndicator/UnsavedIndicator";
import clsx from "clsx";
import { FlashCardItems } from "./FlashCardItems";

import styles from '@/styles/flashcard-block/flashcard.module.scss';

export const FlashCardContent = () => {
    const { isOpenFormEditor } = useFlashCardContext();
    const isDirty = useFlashCardStore((state) => state.isDirty);


    return (
        <section className={styles.flashcard} aria-labelledby="section-flashcard">
            <div className="container">
                <FlashHeader
                    backButtonElement={<BackToFlashDeckButton />}>
                    <EditorFolderMeta />
                    <UnsavedIndicator indicator={isDirty} />
                    <StudyButton />
                </FlashHeader>
                <div className={styles.flashcard__actions}>

                    <div className={clsx(styles.block__cards_wrapper, isOpenFormEditor && styles.open)}>
                        <FlashCardItems />
                    </div>

                    <div className={clsx(styles.block__editor_wrapper, isOpenFormEditor && styles.open)}>
                        <FlashCardEditor />
                    </div>

                </div>
            </div>
        </section>
    );

}