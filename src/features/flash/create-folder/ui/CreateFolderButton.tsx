'use client';
import { Button } from '@/shared/ui/button/Button';
import { useModal } from '@/shared/ui/modal/model/modal.store';
import styles from '@/styles/flashcard-block/flashdeck.module.scss';

export const CreateFolderButton = () => {
    const openModal = useModal(state => state.openModal)
    return (
        <>
            <Button
                className={styles.add}
                variant='primary'
                size='md'
                type='button'
                onClick={() => openModal(true)}>
                Create New Folder
            </Button>
        </>
    )
}