
import { useScrollToTop } from '@/shared/hooks/useScrollToTop';
import styles from '@/styles/blocks/gotop.module.scss';
import clsx from 'clsx';

export const GoTopButton = ({ ref }: { ref: HTMLDivElement | null }) => {
    const { showGoTop, handleScrollUp } = useScrollToTop(ref);

    const classNames = clsx({
        [styles.gotop]: true,
        [styles.active]: showGoTop
    })
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
}
