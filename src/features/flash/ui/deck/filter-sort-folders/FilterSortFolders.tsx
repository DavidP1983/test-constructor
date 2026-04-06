import Select from 'react-select';

import { GeneralFlashType } from '@/entities/flash/types/flashTypes';
import { useGetSelectOptions } from '@/features/flash/model/deck/useGetSelectOptions';
import { SelectOptions } from '@/shared/types/select.types';
import styles from '@/styles/flashcard-block/flashdeck.module.scss';
import { Dispatch, SetStateAction } from 'react';

interface Props {
    data: GeneralFlashType[];
    searchData: { search: string, select: string };
    setSearchData: Dispatch<SetStateAction<{ search: string, select: string }>>
}

export const FilterSortFolders = ({ data, setSearchData, searchData }: Props) => {
    const options = useGetSelectOptions(data);


    return (
        <div className={styles.deck__folders_search}>
            <div className={styles.field}>
                <label htmlFor="search">Search by Folder name</label>
                <input
                    className={styles.input}
                    value={searchData.search}
                    onChange={(e) => setSearchData(prev => ({ ...prev, [e.target.name]: e.target.value }))}
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
                        searchData.select ?
                            options.find(o => o.value === searchData.select)
                            : null
                    }
                    onChange={(option) => {
                        if (option) setSearchData(prev => ({ ...prev, select: option?.value ?? 'all' }))
                    }}
                />
            </div>
        </div>
    )
}