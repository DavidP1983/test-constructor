import { FlashCardsType } from '@/entities/flash/types/flashTypes';
import clsx from 'clsx';
import { motion } from 'motion/react';
import sanitizeHtml from 'sanitize-html';
import { itemVariants } from '../card-list/containerVariants';

import styles from '@/styles/flashcard-block/flashcard.module.scss';

interface Props {
    cards: FlashCardsType[];
    classNames?: string;
    currentCardIndex?: number;
    mode: 'create' | 'edit' | 'study';
    renderAction?: (card: FlashCardsType) => React.ReactNode;
    onSelectCard?: (item: FlashCardsType, i: number) => void
}

export const CardListItem = (
    { cards, classNames, currentCardIndex, mode, renderAction, onSelectCard }: Props) => {

    return (
        <>
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
                        onClick={() => onSelectCard?.(item, i)}>
                        <div className={styles.question}>
                            <span>{i + 1}.</span>
                            {item.question}
                        </div>
                        <div
                            className={styles.answer}
                            dangerouslySetInnerHTML={{
                                __html: sanitizeHtml(item.answer).replace(/&nbsp;/g, ' ')
                            }} />
                        {renderAction?.(item)}
                    </motion.li>
                ))
            }
        </>
    );
}