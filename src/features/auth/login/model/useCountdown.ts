import { useEffect, useRef, useState } from "react";

export const useCountdown = (retryAfter: number) => {
    const [timeLeft, setTimeLeft] = useState<number | null>(null);
    const expireAtRef = useRef<number | null>(null);

    useEffect(() => {
        if (!retryAfter) return;

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTimeLeft(retryAfter);
        expireAtRef.current = Date.now() + retryAfter * 1000;  // Date.now() время текущее в ms + секунды + перевод в ms

        const interval = setInterval(() => {
            if (!expireAtRef.current) return;

            const diff = Math.max(0, Math.ceil((expireAtRef.current - Date.now()) / 1000));  // сколько секунд осталось до конца
            setTimeLeft(diff);

            if (diff <= 0) {
                clearInterval(interval);
                expireAtRef.current = null;
            }
        }, 1000);

        return () => {
            clearInterval(interval);
            expireAtRef.current = null;
        }
    }, [retryAfter]);

    return { timeLeft }
}