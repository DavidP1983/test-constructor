import styles from '@/styles/flashcard-block/flashcard.module.scss';
import clsx from 'clsx';

interface Props {
    mode: string;
    handleNext: () => void;
    handlePrev: () => void;
    currentCardIndex: number;
    length: number;
}

export const renderFlashcardEditorViewByMode = (
    { mode, handleNext, handlePrev, length, currentCardIndex }: Props) => {

    const modeView = {
        'create': <div className={styles.title}>Add New Card</div>,
        'edit': <div className={styles.block__editor_pagination}>
            <div className={styles.title}>Edit Card</div>
            <div className={styles.actions}>
                <div className={styles.counter}>Card {currentCardIndex + 1} of {length}</div>
                <button
                    className={clsx("icon-down-open", styles.btn_down)}
                    aria-label="button down"
                    title='next'
                    disabled={currentCardIndex === length - 1}
                    onClick={handleNext}>
                </button>
                <button
                    className={clsx("icon-up-open", styles.btn_up)}
                    aria-label="button up"
                    title='prev'
                    disabled={currentCardIndex === 0}
                    onClick={handlePrev}>
                </button>
            </div>
        </div>
    }
    return modeView[mode as keyof typeof modeView];
}