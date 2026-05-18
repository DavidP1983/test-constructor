'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FlashCardsType } from "@/entities/flash-card/model/types/card.types";
import { useFlashCardStore } from "@/features/flash-card";
import { CollectStatusProps } from "@/widgets/flash-study/model/types/flash.study.types";
import { useEffect, useRef, useState } from "react";
import { useShallow } from "zustand/shallow";


interface Props extends CollectStatusProps {
    cards: FlashCardsType[];
}

export const useSliderLogic = ({ cards, setCollectStatus, collectStatus }: Props) => {
    const [cloned, setCloned] = useState(false);
    const [volume, setVolume] = useState<'on' | 'off'>('off');

    const myRef = useRef<HTMLDivElement | null>(null);
    const timer = useRef<NodeJS.Timeout | null>(null);

    const { currentCardIndex, handleNext, handlePrev } = useFlashCardStore(useShallow((state) => ({
        currentCardIndex: state.currentCardIndex,
        handleNext: state.handleNext,
        handlePrev: state.handlePrev
    })));


    const handleCloneExample = async () => {
        const elem = myRef.current;
        setCloned(true);
        if (elem) {
            await navigator.clipboard.writeText(elem.textContent);

            if (timer.current) {
                clearTimeout(timer.current);
            }
            timer.current = setTimeout(() => {
                setCloned(false);
            }, 3000);
        }
    };


    useEffect(() => {
        return () => {
            if (timer.current) {
                clearTimeout(timer.current)
            }
        }
    }, []);


    const handleCollectStatus = (status: 'known' | 'repeat') => {
        setCollectStatus(prev => ({
            ...prev,
            [card._id]: status
        }));
    }

    const handleDragEdn = (e: any, info: any) => {
        const swipeThreshold = 30;

        if (info.offset.x > swipeThreshold) {
            handlePrev();
        } else if (info.offset.x < -swipeThreshold) {
            handleNext(cards.length);
        }
    }

    const card = cards[currentCardIndex];
    const status = collectStatus[card._id] ?? null;

    return {
        myRef,
        card,
        currentCardIndex,
        cloned,
        volume,
        setVolume,
        handleCloneExample,
        handleCollectStatus,
        handleDragEdn,
        status,
        handleNext,
        handlePrev
    }
}