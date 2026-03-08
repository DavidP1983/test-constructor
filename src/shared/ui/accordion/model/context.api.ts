import { createContext } from "react";

type TContext = {
    activeIndex: number | null;
    handleToggleAccordion: (item: number) => void
}


export const ContextApi = createContext<TContext>({
    activeIndex: null,
    handleToggleAccordion: () => { }
})