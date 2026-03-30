import { useState } from "react";

export const useCardNavigation = () => {
    const [currentCardIndex, setCurrentCardIndex] = useState(0);

    const handleNext = (length: number) => {
        setCurrentCardIndex(prev => Math.min(prev + 1, length - 1));
    };

    const handlePrev = () => {
        setCurrentCardIndex(prev => Math.max(prev - 1, 0));
    };

    return { currentCardIndex, handleNext, handlePrev, setCurrentCardIndex }
}