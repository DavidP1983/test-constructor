import { Skeleton } from "@/shared/ui/skeleton/Skeleton";
import styles from '@/styles/blocks/skeleton.module.scss';
import clsx from 'clsx';


export default function Loading() {
    return (
        <Skeleton>
            <div className={styles.circle}></div>
            <div className={clsx(styles.line, styles.line1)}></div>
            <div className={clsx(styles.line, styles.line2)}></div>
            <div className={clsx(styles.line, styles.line3)}></div>
            <div className={clsx(styles.line, styles.line4)}></div>
            <div className={clsx(styles.line, styles.line5)}></div>
            <div className={clsx(styles.line, styles.line6)}></div>
        </Skeleton>
    )
}