import { motion } from 'motion/react';
import { useId } from 'react';
import Select from 'react-select';
import { filterVariants } from '../config/animation';
import { filterOptions } from '../constants/filter-options';
import { sortOptions } from '../constants/sort-options';
import { FilterStatus, PropsType, SelectOptions, SortStatus } from '../types/filter.types';

import styles from '@/styles/blocks/table.module.scss';


export const FilterTests = ({ filterStatus, sortStatus, setFilter, setSort, status }: PropsType) => {
    const filterIds = useId();
    const sortIds = useId();
    const isReady = status !== 'loading';

    return (
        <div className={styles.test__filter}>
            <motion.div
                initial={false}
                variants={filterVariants}
                animate={isReady ? 'ready' : 'initialLeft'}
            >
                <span className={styles.test__filter_desc}>Filter by Status</span>
                <Select<SelectOptions<FilterStatus>, false>
                    options={filterOptions}
                    className={styles.test__filter_select}
                    isSearchable={false}
                    placeholder="--Filter by status--"
                    instanceId={filterIds}
                    value={filterOptions.find(o => o.value === filterStatus)}
                    onChange={(option) => {
                        if (option) setFilter(option.value)
                    }}
                />
            </motion.div>

            <motion.div
                initial={false}
                variants={filterVariants}
                animate={isReady ? 'ready' : 'initialRight'}
            >
                <span className={styles.test__filter_desc}>Sort by Status</span>
                <Select<SelectOptions<SortStatus>, false>
                    options={sortOptions}
                    className={styles.test__filter_select}
                    isSearchable={false}
                    placeholder="--Sort by status--"
                    instanceId={sortIds}
                    value={sortOptions.find(o => o.value === sortStatus)}
                    onChange={(option) => {
                        if (option) setSort(option.value)
                    }}
                />
            </motion.div>
        </div>
    )
}

