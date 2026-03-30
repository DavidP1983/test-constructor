'use client';

import { FlashCardsType } from "@/entities/flash/types/flashTypes";
import { CardListItem } from "@/entities/flash/ui/card/card-list-item/CardListItem";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { containerVariants } from "../../card/card-list/containerVariants";

import styles from '@/styles/flashcard-block/flashcard.module.scss';

interface Props {
    cards: FlashCardsType[];
}

export const StudyList = ({ cards }: Props) => {

    return (
        <div className={styles.block__cards}>
            <div className={styles.title}>Cards <span>({cards.length})</span></div>
            {
                cards.length
                    ?

                    <motion.ul
                        className={styles.block__cards_items}
                        variants={containerVariants}
                        initial='hidden'
                        animate='show'>
                        <AnimatePresence>
                            <CardListItem
                                cards={cards}
                                mode="study"
                            />
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
