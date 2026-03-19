'use client';
import { useModal } from '@/shared/ui/modal/model/modal.store';
import styles from '@/styles/flashcard-block/flashdeck.module.scss';

export const CreateFolder = () => {
    const openModal = useModal(state => state.openModal)
    return (
        <>
            <button
                className={styles.add}
                onClick={() => openModal(true)}>Create New Folder</button>
        </>
    )
}