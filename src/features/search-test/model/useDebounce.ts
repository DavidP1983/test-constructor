import { useEffect, useState } from "react";

export const useDebounce = (searchTerm: string, duration: number) => {
    const [state, setState] = useState(searchTerm);

    useEffect(() => {
        const timer = setTimeout(() => {
            setState(searchTerm)
        }, duration)
        return () => clearTimeout(timer)
    }, [searchTerm, duration]);

    return state;
}