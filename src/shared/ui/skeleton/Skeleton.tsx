
import styles from '@/styles/blocks/skeleton.module.scss';
import clsx from 'clsx';

export const Skeleton = () => {
    return (
        <div className={styles.center}>
            <div className={styles.loader}>
                <div className={styles.wrapper}>
                    <div className={styles.circle}></div>
                    <div className={clsx(styles.line, styles.line1)}></div>
                    <div className={clsx(styles.line, styles.line2)}></div>
                    <div className={clsx(styles.line, styles.line3)}></div>
                    <div className={clsx(styles.line, styles.line4)}></div>
                    <div className={clsx(styles.line, styles.line5)}></div>
                    <div className={clsx(styles.line, styles.line6)}></div>
                </div>
            </div>
        </div>
    )
}