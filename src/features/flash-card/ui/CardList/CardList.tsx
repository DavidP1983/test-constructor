'use client';
/*
    1. Используем item._id как основной key (он приходит с сервера и уникальный).

    Но при optimistic update (onMutate) карточка может ещё не иметь _id,
    поэтому добавляем fallback key: temp-${i}, чтобы избежать warning'а React
    "Each child in a list should have a unique key".

    Временный key нужен только до тех пор, пока сервер не вернёт настоящий _id.

    2. useEffect ->  При добавлении новой карточки прокрутка идет вниз к добавленной карточке
*/
import { CardListItem } from '@/entities/flash-card';
import { FlashCardsType } from '@/entities/flash-card/model/types/card.types';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef } from 'react';
import { useShallow } from 'zustand/shallow';
import { useFlashCardContext, useFlashCardStore } from '../../model';
import { animationVariants } from './animation';
import { CardItemActions } from './CardItemActions';

import styles from '@/styles/flashcard-block/flashcard.module.scss';

interface Props {
    cards: FlashCardsType[];
}

export const CardList = ({ cards }: Props) => {

    const { mode } = useFlashCardContext();
    const {
        setCardFieldsData,
        currentCardIndex,
        setCurrentCardIndex,
        isCardCreated,
        setIsCardCreated } = useFlashCardStore(useShallow((state) => ({
            setCardFieldsData: state.setCardFieldsData,
            currentCardIndex: state.currentCardIndex,
            setCurrentCardIndex: state.setCurrentCardIndex,
            isCardCreated: state.isCardCreated,
            setIsCardCreated: state.setIsCardCreated
        })));

    const myRef = useRef<HTMLUListElement | null>(null);

    useEffect(() => {
        const elem = myRef.current;
        if (elem && isCardCreated) {
            elem.lastElementChild?.scrollIntoView({ behavior: 'smooth' })
        }
        setIsCardCreated(false);
    }, [isCardCreated, setIsCardCreated]);


    const classNames = clsx({
        [styles.card__edit]: mode === 'edit',
    });

    return (

        <motion.ul
            className={styles.block__cards_items}
            ref={myRef}
            variants={animationVariants}
            initial='hidden'
            animate='show'>

            <AnimatePresence>
                {
                    cards.map((item, i) => (
                        <CardListItem
                            key={item._id ?? `temp-${i}`}
                            card={item}
                            index={i}
                            isCurrentIndex={i === currentCardIndex && mode === 'edit'}
                            classNames={classNames}
                            onClick={() => {
                                if (mode === 'create') return;
                                setCardFieldsData(item)
                                setCurrentCardIndex(i)
                            }}
                            action={<CardItemActions card={item} />}
                        />
                    ))
                }

            </AnimatePresence>
        </motion.ul>
    );
}