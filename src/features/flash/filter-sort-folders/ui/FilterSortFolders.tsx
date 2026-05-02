import { SelectOptions } from '@/shared/types/select.types';
import { Dispatch, SetStateAction } from 'react';
import Select from 'react-select';

import styles from '@/styles/flashcard-block/flashdeck.module.scss';

interface Props {
    options: SelectOptions<string>[];
    filterState: { search: string, select: string };
    setFilterState: Dispatch<SetStateAction<{ search: string, select: string }>>
}

export const FilterSortFolders = ({ options, setFilterState, filterState }: Props) => {

    return (
        <div className={styles.deck__folders_search}>
            <div className={styles.field}>
                <label htmlFor="search">Search by Folder name</label>
                <input
                    className={styles.input}
                    value={filterState.search}
                    onChange={(e) => setFilterState(prev => ({ ...prev, search: e.target.value }))}
                    type="search"
                    id="search"
                    name="search"
                    placeholder="Type a folder name..." />
            </div>
            <div className={styles.field}>
                <label htmlFor="tag">Search by Tag name</label>
                <Select<SelectOptions<string>, false>
                    options={options}
                    className={styles.select}
                    isSearchable={false}
                    name='select'
                    placeholder="--Select tag--"
                    instanceId='tag'
                    value={
                        filterState.select ?
                            options.find(o => o.value === filterState.select)
                            : null
                    }
                    onChange={(option) => {
                        if (option) setFilterState(prev => ({
                            ...prev,
                            select: option ? option.value : 'all'
                        }));
                    }}
                />
            </div>
        </div>
    )
}