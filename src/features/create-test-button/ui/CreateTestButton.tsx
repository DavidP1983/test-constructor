
import { useModal } from '@/shared/ui/modal/model/modal.store';
import styles from '@/styles/blocks/createtestbutton.module.scss';

export const CreateTestButton = () => {
    const openModal = useModal(state => state.openModal);
    return (
        <button
            className={styles.create__btn}
            onClick={() => openModal(true)}
        >
        </button>
    )
}