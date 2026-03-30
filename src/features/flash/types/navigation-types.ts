import type { Dispatch, SetStateAction } from "react";

export type NavigationCard = {
    currentCardIndex: number;
    handleNext: (length: number) => void;
    handlePrev: () => void;
    setCurrentCardIndex: Dispatch<SetStateAction<number>>;
}