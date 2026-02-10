import { useEffect, useState } from "react";

export const useScrollToTop = (ref: HTMLDivElement | null) => {
    const [showGoTop, setShowGoTop] = useState(false);

    const handleScrollUp = () => {
        ref?.scrollTo({ behavior: 'smooth', top: 0 })
    }

    useEffect(() => {

        if (!ref) return;

        const handleVisibleButton = () => {
            const offset = ref.scrollTop;
            setShowGoTop(offset > 0)
        }

        handleVisibleButton();
        ref.addEventListener('scroll', handleVisibleButton)
        return () => ref.removeEventListener('scroll', handleVisibleButton);
    }, [ref]);

    return { showGoTop, handleScrollUp }
}