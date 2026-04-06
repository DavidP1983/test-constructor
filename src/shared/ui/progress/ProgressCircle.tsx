import { memo, type RefObject } from 'react';

import styles from '@/styles/blocks/progresscircle.module.scss';

interface PropsProgressCircle {
    width: number;
    height: number;
    radius: number;
    strokeWidth: number;
    progressCount: number;
    color: string | undefined;
    myRef: RefObject<HTMLDivElement | null>
}

const ProgressCircle = (
    { width, height, radius, strokeWidth, progressCount, color, myRef }: PropsProgressCircle) => {

    const count = Math.floor(progressCount)
    const normalizedRadius = radius - strokeWidth * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - count / 100 * circumference;

    return (
        <div className={styles.progress} ref={myRef}>
            <div className={styles.progress__outer}>
                <div className={styles.progress__inner}>
                    <div className={styles.progress__number}>{count}%</div>
                </div>
            </div>
            <svg
                width={`${width}px`}
                height={`${height}px`}>
                <circle
                    cx={radius}
                    cy={radius}
                    r={normalizedRadius}
                    fill='none'
                    stroke={color || 'red'}
                    strokeWidth={strokeWidth}
                    strokeDasharray={`${circumference} ${circumference}`}
                    style={{ strokeDashoffset }}
                />
            </svg>
        </div>
    );
}

export default memo(ProgressCircle)

