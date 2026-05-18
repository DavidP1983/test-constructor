'use client';

import { Button } from '@/shared/ui/button/Button';
import { useFlashCardContext } from '../model';

import styles from '@/styles/flashcard-block/flashcard.module.scss';

export const AddCardButton = () => {
    const { mode, setIsOpenFormEditor } = useFlashCardContext();

    return (
        <Button
            className={styles.block__cards_btnadd}
            onClick={() => setIsOpenFormEditor(prev => !prev)}
            type='button'>
            {mode === 'create' ? "+ Add new card" : 'Edit card'}
        </Button>
    );
}