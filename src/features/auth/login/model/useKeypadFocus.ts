import { useRef } from "react";

export const useKeypadFocus = () => {
    const myRefFocus = useRef<(HTMLButtonElement | null)[]>([]);

    const focusKeypadButton = (elemAttr: string) => {
        myRefFocus.current.forEach((elem, i) => {
            if (elem?.dataset.attr === elemAttr) {
                myRefFocus.current[i]?.focus();
            }
        });
    }

    return { focusKeypadButton, myRefFocus }
}