'use client';

import { useFolderFormContext } from '@/features/flash/model/context/FolderFormContext';

import styles from '@/styles/flashcard-block/flashcard.module.scss';

export const AddCard = () => {
    const { handleOpenFormEditor, mode } = useFolderFormContext();

    return (
        <button
            className={styles.block__cards_btnadd}
            onClick={handleOpenFormEditor}>
            {mode === 'create' ? "+ Add new card" : 'Edit card'}
        </button>
    );
}