import { useFolderFormContext } from '@/features/flash/model/context/FolderFormContext';

import styles from '@/styles/flashcard-block/flashcard.module.scss';

export const BackToFlashcardsButton = () => {
    const { handleUpsert, isDirty } = useFolderFormContext();
    return (
        <>
            <button
                className={styles.back}
                onClick={() => handleUpsert('link')}
                title={isDirty ? 'You have unsaved changes' : ''}>
                <span className="icon-left-open"></span>
                FlashCards
            </button>
        </>
    )
}