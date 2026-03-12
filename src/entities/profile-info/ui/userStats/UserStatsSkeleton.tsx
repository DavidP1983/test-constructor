import { Skeleton } from "@/shared/ui/skeleton/Skeleton";
import clsx from "clsx";

import styles from '@/styles/blocks/skeleton.module.scss';

export const UserStatsSkeleton = () => {

    return (
        <Skeleton statistic='stats'>
            <div className={clsx(styles.line, styles.stats1)}></div>
            <div className={clsx(styles.line, styles.stats2)}></div>
            <div className={clsx(styles.line, styles.stats3)}></div>
        </Skeleton>
    )
}