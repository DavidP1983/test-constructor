import styles from '@/styles/blocks/indicator.module.scss';
import clsx from 'clsx';

export const UnsavedIndicator = ({ indicator }: { indicator: boolean }) => {
    return (

        <div className={clsx(styles.indicator, indicator && styles.active)}>
            <div className={styles.indicator_circle}></div>
            <div className={styles.indicator_title}>Unsaved changes</div>
        </div>
    )
}