/*
    1. Используем item._id как основной key (он приходит с сервера и уникальный).

    Но при optimistic update (onMutate) карточка может ещё не иметь _id,
    поэтому добавляем fallback key: temp-${i}, чтобы избежать warning'а React
    "Each child in a list should have a unique key".

    Временный key нужен только до тех пор, пока сервер не вернёт настоящий _id.

    2. useEffect ->  При добавлении новой карточки прокрутка идет вниз к добавленной карточке
*/
import { FlashCardsType } from '@/entities/flash/types/flashTypes';
import { useFolderFormContext } from '@/features/flash/model/context/FolderFormContext';
import { CardsActions } from '@/features/flash/ui/card/edit-delete-card/CardsActions';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef } from 'react';
import { CardListItem } from '../card-list-item/CardListItem';
import { containerVariants } from './containerVariants';

import styles from '@/styles/flashcard-block/flashcard.module.scss';

interface Props {
    cards: FlashCardsType[];
}

export const CardList = ({ cards }: Props) => {

    const {
        isPendingCreate,
        mode,
        handleEditCard,
        navigationActions,
    } = useFolderFormContext();

    const myRef = useRef<HTMLUListElement | null>(null);
    const { currentCardIndex, setCurrentCardIndex } = navigationActions;


    useEffect(() => {
        const elem = myRef.current;
        if (elem && isPendingCreate) {
            elem.lastElementChild?.scrollIntoView({ behavior: 'smooth' })
        }
    }, [cards, isPendingCreate]);


    const classNames = clsx({
        [styles.card__edit]: mode === 'edit',
    });

    return (

        <motion.ul
            className={styles.block__cards_items}
            ref={myRef}
            variants={containerVariants}
            initial='hidden'
            animate='show'>

            <AnimatePresence>
                <CardListItem
                    cards={cards}
                    classNames={classNames}
                    currentCardIndex={currentCardIndex}
                    mode={mode}
                    onSelectCard={(item: FlashCardsType, i: number) => {
                        if (mode === 'create') return;
                        handleEditCard(item)
                        setCurrentCardIndex(i)
                    }}
                    renderAction={(card: FlashCardsType) => < CardsActions card={card} />}
                />
            </AnimatePresence>
        </motion.ul>
    );
}