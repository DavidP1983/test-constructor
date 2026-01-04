import Image from "next/image";

import styles from '@/styles/blocks/error.module.scss';


interface ErrorProps {
    error: string;
    actions?: React.ReactNode
}

export const ErrorPage = ({ error, actions }: ErrorProps) => {
    return (
        <div className={styles.error}>
            <Image
                src="/assets/error.webp"
                alt="Error"
                loading="eager"
                width={200}
                height={200}
                className={styles.error__img} />
            <h2 className={styles.error__title}>{error}</h2>
            {actions}
        </div>
    )
}