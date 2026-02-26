/* eslint-disable react/display-name */
import { useScrollToTop } from '@/shared/hooks/useScrollToTop';
import clsx from 'clsx';
import { memo } from 'react';

import styles from '@/styles/blocks/gotop.module.scss';


export const GoTopButton = memo(({ ref }: { ref: HTMLDivElement | null }) => {
    const { showGoTop, handleScrollUp } = useScrollToTop(ref);

    const classNames = clsx({
        [styles.gotop]: true,
        [styles.active]: showGoTop
    });


    return (
        <div
            aria-label="to top button"
            className={classNames}
            onClick={handleScrollUp}>
            <span></span>
            <span></span>
            <span></span>
        </div>
    )
});


