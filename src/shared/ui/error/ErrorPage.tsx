import styles from '@/styles/blocks/error.module.scss';

export const ErrorPage = ({ error }: { error: string }) => {
    return (
        <div className={styles.error}>
            <h2 className={styles.error__title}>{error}</h2>
        </div>
    )
}