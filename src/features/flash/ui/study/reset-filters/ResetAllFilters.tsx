import { StateStudyFilterType } from '@/widgets/flash/ui/flash-study/FlashCardStudy';
import type { Dispatch, SetStateAction } from 'react';

import styles from '@/styles/flashcard-block/flashcard.module.scss';


export const ResetAllFilters = ({ setFilters }: { setFilters: Dispatch<SetStateAction<StateStudyFilterType>> }) => {

    const handleResetFilters = () => {
        setFilters(
            {
                status: '',
                difficulty: undefined,
                limit: undefined,
                sort: undefined
            }
        );
    };

    return (
        <button
            className={styles.reset}
            onClick={handleResetFilters}>
            Reset all filters
        </button>
    );
}

