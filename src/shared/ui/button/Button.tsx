import styles from '@/styles/blocks/button.module.scss';
import clsx from "clsx";

export type ButtonTypes = {
    children: React.ReactNode;
    onClick?: () => void;
    type: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    variant?: 'primary' | 'secondary';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

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