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
import clsx from 'clsx';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef } from 'react';
import sanitizeHtml from 'sanitize-html';
import { containerVariants, itemVariants } from './containerVariants';

import styles from '@/styles/flashcard-block/flashcard.module.scss';

interface Props {
    renderAction: (id: FlashCardsType) => React.ReactNode;
    cards: FlashCardsType[];
}

export const CardList = ({ renderAction, cards }: Props) => {

    const {
        isPendingCreate,
        mode,
        handleEditCard,
        setCurrentCardIndex,
        currentCardIndex
    } = useFolderFormContext();

    const myRef = useRef<HTMLUListElement | null>(null);


    useEffect(() => {
        const elem = myRef.current;
        if (elem && isPendingCreate) {
            elem.lastElementChild?.scrollIntoView({ behavior: 'smooth' })
        }
    }, [cards, isPendingCreate]);


    const classNames = clsx({
        [styles.card__edit]: mode === 'edit'
    });

    return (

        <motion.ul
            className={styles.block__cards_items}
            ref={myRef}
            variants={containerVariants}
            initial='hidden'
            animate='show'>

            <AnimatePresence>
                {
                    cards.map((item, i) => (
                        <motion.li
                            layout
                            variants={itemVariants}
                            initial='hidden'
                            animate='show'
                            exit='exit'
                            className={clsx(classNames, i === currentCardIndex && mode !== 'create' ? styles.card__active : '')}
                            key={item._id ?? `temp-${i}`}
                            title={item.question ?? 'card'}
                            onClick={() => {
                                if (mode === 'create') return;
                                handleEditCard(item)
                                setCurrentCardIndex(i)
                            }}>
                            <div className={styles.question}>
                                <span>{i + 1}.</span>
                                {item.question}
                            </div>
                            <div
                                className={styles.answer}
                                dangerouslySetInnerHTML={{
                                    __html: sanitizeHtml(item.answer).replace(/&nbsp;/g, ' ')
                                }} />
                            {renderAction(item)}
                        </motion.li>
                    ))
                }
            </AnimatePresence>
        </motion.ul>
    );
}