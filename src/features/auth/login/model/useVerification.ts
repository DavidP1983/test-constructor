import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useShallow } from "zustand/shallow";
import { useLoginForm } from "./store";
import { useCountdown } from "./useCountdown";
import { useKeypadFocus } from "./useKeypadFocus";

export const useVerification = () => {
    const [code, setCode] = useState<string>('');
    const codeRef = useRef(code);  // Чтобы получать актуальные данные с состояния избегая зымакания
    const { authStep, codeVerification, tryLimit, resendCode, retryAfter } = useLoginForm(useShallow((state) => ({
        authStep: state.authStep,
        tryLimit: state.tryLimit,
        codeVerification: state.codeVerification,
        resendCode: state.resendCode,
        retryAfter: state.retryAfter
    })));

    const { timeLeft } = useCountdown(retryAfter);   // Хукк с таймером
    const { focusKeypadButton, myRefFocus } = useKeypadFocus();  // Хукк для установки фокуса на элемент при ручном вводе
    const router = useRouter();


    // Событие click
    const handleVerifyCode = async (e: React.MouseEvent<HTMLButtonElement>) => {
        const target = e.currentTarget.dataset.attr;
        if (!target) return;
        handleAction(target);
    }

    // Событие keyboard
    const keyboardHandler = (e: KeyboardEvent) => {
        e.preventDefault(); // Чтобы не было двойного вызова handleSubmit, так как e.key === 'Enter' равносильно click

        if (/^[0-9]$/.test(e.key)) return handleAction(e.key);
        if (e.key === 'Backspace') return handleAction('clear');
        if (e.key === 'Enter') return handleAction('go');
    }

    // Один источник логики
    const handleAction = (value: string) => {
        if (value === 'clear') return handleBackSpace();
        if (value === 'go') return handleSubmit(codeRef.current);
        return handleInput(value);
    }

    const handleInput = (digits: string) => {
        setCode(prev => {
            if (prev.length >= 4) return prev;
            return prev + digits
        });
        focusKeypadButton(digits);
    }

    const handleBackSpace = () => {
        setCode((prev) => prev.slice(0, -1));
        focusKeypadButton('clear');
    }

    const handleSubmit = async (code: string) => {
        focusKeypadButton('go');
        try {
            const success = await codeVerification(code);
            if (success) router.push('/builder');
            setCode('');
        } catch {
            setCode('')
        }
    }

    // Чтобы получать актуальные данные с состояния избегая зымакания
    useEffect(() => {
        codeRef.current = code;
    }, [code])


    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (tryLimit === 4) return;
            keyboardHandler(e)
        }
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [tryLimit]);


    return {
        authStep,
        tryLimit,
        resendCode,
        timeLeft,
        handleVerifyCode,
        myRefFocus,
        code
    }

}