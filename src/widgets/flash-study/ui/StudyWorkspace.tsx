import { FlashCardsType } from '@/entities/flash-card/model/types/card.types';
import { StudyList } from '@/entities/flash-study';
import { StudyFilters } from '@/features/flash-study';
import { FilterTypeProps } from '@/features/flash-study/model/types/flash.study.types';
import { Button } from '@/shared/ui/button/Button';
import ProgressCircle from '@/shared/ui/progress/ProgressCircle';
import clsx from 'clsx';
import { motion } from "motion/react";
import { useStudyProgress } from '../model';

import styles from '@/styles/flashcard-block/flashcard.module.scss';

export interface StudyWorkspaceProps extends FilterTypeProps {
    cards: FlashCardsType[];
    filterResult: FlashCardsType[]
}

export const StudyWorkspace = ({ cards, filters, setFilters, filterResult }: StudyWorkspaceProps) => {
    const { progressCount, isVisible, myRef, message } = useStudyProgress(cards);

    const classNames = clsx({
        [styles.progress]: true,
        [styles.visible]: isVisible
    });


    return (

        <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}>

            <div className={styles.flashcard__actions}>
                <div className={clsx(styles.block__cards_wrapper, true && styles.open)}>
                    <StudyList cards={filterResult} />
                    <ProgressCircle
                        width={150}
                        height={150}
                        radius={75}
                        strokeWidth={11}
                        progressCount={progressCount}
                        color={message?.color}
                        myRef={myRef} />
                    <div className={classNames}>{message?.text ?? ''}</div>
                </div>
                <div className={clsx(styles.block__editor_wrapper, true && styles.open)}>
                    <div className={styles.block__filters}>
                        <StudyFilters setFilters={setFilters} filters={filters} />
                        <Button
                            className={styles.reset}
                            type='button'
                            onClick={() => {
                                setFilters(
                                    {
                                        status: 'all',
                                        difficulty: undefined,
                                        limit: undefined,
                                        sort: undefined
                                    }
                                );
                            }}>
                            Reset all filters
                        </Button>
                    </div>
                </div>
            </div>

        </motion.div>

    );
}