import { IconButton } from '@/shared/ui';
import styles from '@/styles/flashcard-block/flashcard.module.scss';

interface Props {
    mode: string;
    handleNext: (length: number) => void;
    handlePrev: () => void;
    currentCardIndex: number;
    length: number;
}

export const FlashCardEditorHeader = (
    { mode, handleNext, handlePrev, length, currentCardIndex }: Props) => {

    const modeView = {
        'create': <div className={styles.title}>Add New Card</div>,
        'edit': <div className={styles.block__editor_pagination}>
            <div className={styles.title}>Edit Card</div>
            <div className={styles.actions}>
                <div className={styles.counter}>Card {currentCardIndex + 1} of {length}</div>
                <IconButton
                    className={styles.btn_down}
                    icon='icon-down-open'
                    aria-label="button down"
                    title='next'
                    disabled={currentCardIndex === length - 1}
                    onClick={() => handleNext(length)}>
                </IconButton>
                <IconButton
                    className={styles.btn_up}
                    icon='icon-up-open'
                    aria-label="button up"
                    title='prev'
                    disabled={currentCardIndex === 0}
                    onClick={handlePrev}>
                </IconButton>
            </div>
        </div>
    }
    return modeView[mode as keyof typeof modeView];
}