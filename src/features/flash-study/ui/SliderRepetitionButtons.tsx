import { FlashCardsType } from '@/entities/flash-card/model/types/card.types';
import clsx from 'clsx';

import styles from '@/styles/flashcard-block/flashcard.module.scss';


interface Props {
    card: FlashCardsType;
    answerStatus: "repeat" | "known";
    handleCollectStatus: (status: "known" | "repeat") => void;
}

export const SliderRepetitionButtons = ({ card, answerStatus, handleCollectStatus }: Props) => {

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
                    handleCollectStatus('known');
                }}
            > I know
            </button>
            <button
                className={classNameAnswerStatusRepeat}
                onClick={() => {
                    handleCollectStatus('repeat');
                }}> Review
            </button>
        </div>
    );
}