
import styles from '@/styles/flashcard-block/flashcard.module.scss';

export const StudyCards = () => {

    return (
        <div className={styles.flashcard__breadcrumb_btn}>
            <button className={styles.study}>Study</button>
        </div>
    );
}