'use client';

import clsx from 'clsx';
import { useEffect, useRef } from 'react';
import { useSearch } from '../model/useSearch';

import styles from '@/styles/blocks/search.module.scss';


export const SearchTest = () => {
    const {
        isOpen,
        value,
        setValue,
        handleOpen
    } = useSearch();
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (inputRef) {
            inputRef.current?.focus();
        }
    }, [isOpen])


    return (
        <div className={clsx(styles.search, isOpen && styles.active)}>
            <button
                className={styles.search__btn}
                type="button"
                aria-label="Search button"
                onClick={handleOpen}>{isOpen ? '\u2716' : '\u{1F50D}'}</button>
            <input
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value.trim())}
                className={styles.search__input}
                inputMode="search"
                placeholder="Search test..." />
        </div>
    )
}