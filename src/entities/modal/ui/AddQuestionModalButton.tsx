import { useModal } from "../model/store";

import styles from '@/styles/blocks/modal.module.scss';

export const AddQuestionModalButton = () => {
    const openModal = useModal(state => state.openModal);

    return (
        <button
            className={styles.create__btn}
            onClick={() => openModal(true)}
        >
        </button>
    )
}