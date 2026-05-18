import clsx from 'clsx';
import { motion } from 'motion/react';
import { memo, useMemo } from 'react';
import sanitizeHtml from 'sanitize-html';
import { FlashCardsType } from '../model/types/card.types';
import { animationVariants } from './animation';

import styles from '@/styles/flashcard-block/flashcard.module.scss';

interface CardItemProps {
    card: FlashCardsType;
    index: number;
    isCurrentIndex?: boolean;
    classNames?: string;
    onClick?: () => void
    action?: React.ReactNode
}

// eslint-disable-next-line react/display-name
export const CardListItem = memo(({ card, index, action, classNames, isCurrentIndex, onClick }: CardItemProps) => {


    // Чтобы не пересчитывать каждый раз при поиске элементов
    const sanitizedAnswer = useMemo(() => {
        return sanitizeHtml(card.answer).replace(/&nbsp;/g, ' ') ?? '';
    }, [card.answer]);

    return (
        <motion.li
            variants={animationVariants}
            initial='hidden'
            animate='show'
            exit='exit'
            className={clsx(classNames, isCurrentIndex && styles.card__active)}
            title={card.question ?? 'card'}
            onClick={onClick}>
            <div className={styles.question}>
                <span>{index + 1}.</span>
                {card.question}
            </div>
            <div
                className={styles.answer}
                dangerouslySetInnerHTML={{
                    __html: sanitizedAnswer
                }} />
            {action}
        </motion.li>

    );
});