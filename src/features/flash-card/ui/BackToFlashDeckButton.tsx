import { useShallow } from 'zustand/shallow';
import { useFlashCardStore, useUpsertFlow } from '../model';

import styles from '@/styles/flashcard-block/flashcard.module.scss';

export const BackToFlashDeckButton = () => {
    const { handleUpsert } = useUpsertFlow();
    const { isDirty } = useFlashCardStore(useShallow((state) => ({
        isDirty: state.isDirty,
    })));

    return (
        <>
            <button
                className={styles.back}
                onClick={() => handleUpsert('link')}
                title={isDirty ? 'You have unsaved changes' : 'Back to Deck'}>
                <span className="icon-left-open"></span>
                FlashCards
            </button>
        </>
    )
}