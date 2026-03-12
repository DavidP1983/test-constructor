
import styles from '@/styles/blocks/skeleton.module.scss';
import clsx from 'clsx';

export const Skeleton = ({ children, statistic }: { children: React.ReactNode, statistic?: string }) => {
    return (
        <div className={clsx(styles.center, statistic ? styles[statistic] : '')}>
            <div className={clsx(styles.loader, statistic ? styles[statistic] : '')}>
                <div className={styles.wrapper}>
                    {children}
                </div>
            </div>
        </div>
    )
}