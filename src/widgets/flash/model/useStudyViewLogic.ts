import { FlashCardsType } from "@/entities/flash/types/flashTypes";
import { useEffect, useRef, useState } from "react";

export const useStudyViewLogic = (cards: FlashCardsType[]) => {
    const [progressCount, setProgressCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const myRef = useRef<HTMLDivElement | null>(null);

    /* Анимация подсчета успеха повторения карточек */
    const cardStatusKnown = cards?.filter(card => card.status === 'known');
    const cardStatusInPercentage = Math.floor((cardStatusKnown.length * 100) / cards?.length);

    useEffect(() => {
        if (!cards?.length) return;

        const ref = myRef.current;
        let start: number | null = null;
        const duration = 1000;
        let animationFrameId: number;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;
                setIsVisible(entry.isIntersecting);

                const animate = (timestamp: number) => {
                    if (!start) start = timestamp;

                    const progress = timestamp - start;
                    const progressRatio = Math.min(progress / duration, 1);

                    const current = progressRatio * cardStatusInPercentage;
                    setProgressCount(current);

                    if (progress < duration) {
                        animationFrameId = requestAnimationFrame(animate);
                    } else {
                        setProgressCount(cardStatusInPercentage);
                    }
                };

                animationFrameId = requestAnimationFrame(animate);

            }, { threshold: 0.5 }
        );

        if (ref) observer.observe(ref)

        return () => {
            if (ref) observer.unobserve(ref)
            cancelAnimationFrame(animationFrameId);
        }

    }, [cards, cardStatusInPercentage, myRef]);


    const getProgressMessages = (progressCount: number | undefined) => {
        if (progressCount === undefined) return;

        if (progressCount <= 20) {
            return { color: '#ef4444', text: 'Getting started, keep going 👍' }
        }
        if (progressCount > 20 && progressCount <= 40) {
            return { color: '#f97316', text: 'Getting into the flow' }
        }
        if (progressCount > 40 && progressCount <= 60) {
            return { color: '#eab308', text: 'Keep it going 💪' }
        }
        if (progressCount > 60 && progressCount <= 80) {
            return { color: '#22c55e', text: 'Looking strong 🔥' }
        }
        if (progressCount > 80 && progressCount <= 100) {
            return { color: '#8b5cf6', text: 'Perfect 👏' }
        }
    }

    const message = getProgressMessages(cardStatusInPercentage);

    return {
        progressCount,
        isVisible,
        myRef,
        message
    }
}