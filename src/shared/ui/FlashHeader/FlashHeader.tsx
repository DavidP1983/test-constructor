
import styles from '@/styles/flashcard-block/flashcard.module.scss';

interface Props {
    children: React.ReactNode;
    backButtonElement: React.ReactNode;
}


export const FlashHeader = ({ children, backButtonElement }: Props) => {

    return (
        <div className={styles.flashcard__breadcrumb}>
            <div className={styles.flashcard__breadcrumb_link}>
                {backButtonElement}
                <div className={styles.divider}></div>
            </div>
            {children}
        </div>
    )
}