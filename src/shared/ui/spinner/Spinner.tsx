import styles from '@/styles/blocks/spinner.module.scss';

export const Spinner = ({ isFallback }: { isFallback?: boolean }) => {
    return (
        <div className={isFallback ? styles.fallback : ''}>
            <div className={styles.loading}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    )
}