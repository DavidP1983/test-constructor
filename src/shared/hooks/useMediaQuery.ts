import { useEffect, useState } from "react";

export const useMediaQuery = (width: number) => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const listener = () => setMatches(window.innerWidth <= width);
            listener(); // получаем начальное значение
            window.addEventListener('resize', listener);

            return () => window.removeEventListener('resize', listener);

        }
    }, [width]);

    return matches;
};
