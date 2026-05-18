'use client';

import { animationVariants, CardListItem } from "@/entities/flash-card";
import { FlashCardsType } from "@/entities/flash-card/model/types/card.types";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";

import styles from '@/styles/flashcard-block/flashcard.module.scss';

interface Props {
    cards: FlashCardsType[];
}

export const StudyList = ({ cards }: Props) => {

    return (
        <div className={styles.block__cards}>
            <div className={styles.title}>Cards <span>({cards.length})</span></div>
            {
                cards.length ?
                    <motion.ul
                        className={styles.block__cards_items}
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
                                    />
                                ))
                            }
                        </AnimatePresence>

                    </motion.ul>
                    :
                    <div className={styles.block__cards_empty}>
                        <Image
                            width={450}
                            height={300}
                            alt="no card yet"
                            src="/assets/no-card-yet.webp" />
                    </div>
            }
        </div>
    )
}
