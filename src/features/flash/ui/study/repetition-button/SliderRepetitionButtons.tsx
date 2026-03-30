import { FlashCardsType } from '@/entities/flash/types/flashTypes';
import clsx from 'clsx';

import styles from '@/styles/flashcard-block/flashcard.module.scss';


interface Props {
    card: FlashCardsType;
    answerStatus: "repeat" | "known";
    collectStatus: (status: "known" | "repeat") => void;
}

export const SliderRepetitionButtons = ({ card, answerStatus, collectStatus }: Props) => {

    const classNameAnswerStatusKnown = clsx({
        ['icon-ok']: true,
        [styles.know]: true,
        [styles.active]: answerStatus ? answerStatus === 'known' : card.status === 'known'
    });
    const classNameAnswerStatusRepeat = clsx({
        ['icon-arrows-cw']: true,
        [styles.review]: true,
        [styles.active]: answerStatus ? answerStatus === 'repeat' : card.status === 'repeat'
    });


    return (
        <div className={styles.block__study_repetition}>
            <button
                className={classNameAnswerStatusKnown}
                onClick={() => {
                    collectStatus('known');
                }}
            > I know
            </button>
            <button
                className={classNameAnswerStatusRepeat}
                onClick={() => {
                    collectStatus('repeat');
                }}> Review
            </button>
        </div>
    );
}