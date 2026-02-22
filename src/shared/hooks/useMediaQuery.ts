import { useEffect, useState } from "react";

export const useMediaQuery = (width: number) => {
    const [matches, setMatches] = useState(() =>
        typeof window !== 'undefined'
            ? window.matchMedia(`(max-width: ${width}px)`).matches
            : false
    );

    useEffect(() => {
        const media = window.matchMedia(`(max-width: ${width}px)`)
        const listener = () => setMatches(media.matches)
        media.addEventListener('change', listener);
        return () => media.removeEventListener('change', listener);
    }, [width]);

    return matches;
};
