'use client';
import { useEffect } from 'react';
import { useFlashCardStore, useUpsertFlow } from '../../model';
import { CardForm } from './CardForm';
import { FlashCardEditorHeader } from './FlashCardEditorHeader';

import styles from '@/styles/flashcard-block/flashcard.module.scss';
import { useShallow } from 'zustand/shallow';


export const FlashCardEditor = () => {
    const {
        cards,
        mode
    } = useUpsertFlow();

    const { setCardFieldsData, handlePrev, handleNext, currentCardIndex } = useFlashCardStore(useShallow((state) => ({
        setCardFieldsData: state.setCardFieldsData,
        handleNext: state.handleNext,
        handlePrev: state.handlePrev,
        currentCardIndex: state.currentCardIndex
    })));

    const currentCard = cards[currentCardIndex];

    /* Благодаря useEffect подставляется нужная карточка с данными */
    useEffect(() => {
        if (currentCard && mode === 'edit') {
            setCardFieldsData(currentCard)
        }
    }, [currentCardIndex, currentCard]);


    /* Данный эффект необходим для корректного получения индекса и передвижения элемента на один назад при удалении*/
    useEffect(() => {
        if (currentCardIndex >= cards.length) {
            handlePrev();
        }
    }, [cards.length, currentCardIndex]);


    return (
        <div className={styles.block__editor}>
            <FlashCardEditorHeader
                mode={mode}
                handleNext={handleNext}
                handlePrev={handlePrev}
                currentCardIndex={currentCardIndex}
                length={cards.length} />

            <CardForm />
        </div>
    );
}