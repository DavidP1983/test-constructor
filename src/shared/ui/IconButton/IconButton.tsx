import clsx from "clsx";

type Props = {
    className: string;
    icon: string;
    ariaLabel?: string;
    onClick?: () => void;
    disabled?: boolean;
    dataAttr?: string;
    title?: string;
}

export const IconButton = ({ className, icon, ariaLabel, onClick, disabled, dataAttr, title }: Props) => {
    return (
        <button
            className={clsx(icon, className)}
            aria-label={ariaLabel}
            title={title}
            data-btn={dataAttr}
            onClick={onClick}
            disabled={disabled ?? false}
        />
    )
}