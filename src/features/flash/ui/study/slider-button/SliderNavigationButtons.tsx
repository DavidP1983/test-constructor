
import { FlashCardsType } from '@/entities/flash/types/flashTypes';
import { soundSpeechText } from '@/features/flash/model/study/utils/soundSpeechText';
import clsx from 'clsx';
import { useEffect } from 'react';

import styles from '@/styles/flashcard-block/flashcard.module.scss';

interface Props {
    handleNext: (length: number) => void;
    handlePrev: () => void;
    currentCardIndex: number;
    length: number;
    card: FlashCardsType;
    volume: 'on' | 'off' | null;
}

export const SliderNavigationButtons = ({ handleNext, handlePrev, currentCardIndex, length, card, volume }: Props) => {

    useEffect(() => {
        if (volume === 'off') return;
        soundSpeechText(card.question, card.lang)
    }, [currentCardIndex, card, volume]);


    return (
        <div className={styles.navigation}>
            <button
                className={clsx('icon-left-open-big', styles.btn__left)}
                aria-label='icon-left'
                onClick={handlePrev}
                disabled={currentCardIndex === 0}
            />
            <span className={styles.count}>{currentCardIndex + 1} / {length}</span>
            <button
                className={clsx('icon-right-open-big', styles.btn__right)}
                aria-label='icon-icon-right'
                onClick={() => handleNext(length)}
                disabled={currentCardIndex === length - 1} />
        </div>
    )
}