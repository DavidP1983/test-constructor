'use client';

import { difficultyOptions } from '@/features/flash/constants/card';
import { filterOptions, limitOptions, sortOptions } from '@/features/flash/constants/study';
import { Difficulty, Filter, Limit, SelectOptions, Sort } from '@/shared/types/select.types';
import { StudyStepProps } from '@/widgets/flash/ui/flash-study/flash-study-view/StudyView';
import Select from 'react-select';

import styles from '@/styles/flashcard-block/flashcard.module.scss';



export const StudyFilters = ({ setFilters, filters }: Omit<StudyStepProps, 'cards' | 'filterResult'>) => {

    return (
        <>
            <div className={styles.block__filters_select}>
                <label htmlFor="status">Card Status</label>
                <Select <SelectOptions<Filter>, false>
                    options={filterOptions}
                    className={styles.select}
                    isSearchable={false}
                    value={
                        filters.status ?
                            filterOptions.find(o => o.value === filters.status)
                            : null
                    }
                    onChange={(option) => {
                        if (option) setFilters(prev => ({ ...prev, ['status']: option.value }))
                    }}
                    name='status'
                    placeholder="--Select type--"
                    instanceId={'status'}

                />
            </div>
            <div className={styles.block__filters_select}>
                <label htmlFor="filter">Card difficulty</label>
                <Select <SelectOptions<Difficulty>, false>
                    options={difficultyOptions}
                    className={styles.select}
                    isSearchable={false}
                    value={
                        filters.difficulty ?
                            difficultyOptions.find(o => o.value === filters.difficulty)
                            : null
                    }
                    onChange={(option) => {
                        if (option) setFilters(prev => ({ ...prev, ['difficulty']: option.value }))
                    }}
                    name='difficulty'
                    placeholder="--Select difficulty--"
                    instanceId={'difficulty'}

                />
            </div>
            <div className={styles.block__filters_select}>
                <label htmlFor="limit">Number of Cards</label>
                <Select <SelectOptions<Limit>, false>
                    options={limitOptions}
                    className={styles.select}
                    isSearchable={false}
                    value={
                        filters.limit ?
                            limitOptions.find(o => o.value === filters.limit)
                            : null
                    }
                    onChange={(option) => {
                        if (option) setFilters(prev => ({ ...prev, ['limit']: option.value }))
                    }}
                    name='limit'
                    placeholder="--Select amount--"
                    instanceId={'limit'}

                />
            </div>
            <div className={styles.block__filters_select}>
                <label htmlFor="sort">Order</label>
                <Select <SelectOptions<Sort>, false>
                    options={sortOptions}
                    className={styles.select}
                    isSearchable={false}
                    value={
                        filters.sort ?
                            sortOptions.find(o => o.value === filters.sort)
                            : null
                    }
                    onChange={(option) => {
                        if (option) setFilters(prev => ({ ...prev, ['sort']: option.value }))
                    }}
                    name='sort'
                    placeholder="--Select order--"
                    instanceId={'sort'}
                />
            </div>
        </>
    );
}
