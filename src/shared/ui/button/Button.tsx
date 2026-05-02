import clsx from "clsx";
import { ButtonTypes } from "./Button.types";

import styles from '@/styles/blocks/button.module.scss';

export const Button = ({ children, onClick, variant, size, className, type, disabled }: ButtonTypes) => {

    return (
        <button
            className={
                clsx(styles.button,
                    styles[variant ?? ''],
                    styles[size ?? ''],
                    className
                )}
            onClick={onClick}
            type={type}
            disabled={disabled ?? false}>
            {children}
        </button>
    )
}