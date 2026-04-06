import { FlashCardsType } from '@/entities/flash/types/flashTypes';
import { StudyList } from '@/entities/flash/ui/study/study-list/StudyList';
import { ResetAllFilters } from '@/features/flash/ui/study/reset-filters/ResetAllFilters';
import { StudyFilters } from '@/features/flash/ui/study/study-filters/StudyFilters';
import { ProgressCircle } from '@/shared/ui/progress/ProgressCircle';
import { useStudyViewLogic } from '@/widgets/flash/model/useStudyViewLogic';
import clsx from 'clsx';
import { type Dispatch, type SetStateAction } from 'react';
import { StateStudyFilterType } from '../FlashCardStudy';

import styles from '@/styles/flashcard-block/flashcard.module.scss';


export interface StudyStepProps {
    cards: FlashCardsType[];
    setFilters: Dispatch<SetStateAction<StateStudyFilterType>>
    filters: StateStudyFilterType;
    filterResult: FlashCardsType[]
}

export const StudyView = ({ cards, filters, setFilters, filterResult }: StudyStepProps) => {
    const { progressCount, isVisible, myRef, message } = useStudyViewLogic(cards);

    const classNames = clsx({
        [styles.progress]: true,
        [styles.visible]: isVisible
    });

    return (
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
                    <ResetAllFilters setFilters={setFilters} />
                </div>
            </div>
        </div>
    );
}