import styles from '@/styles/blocks/spinner.module.scss';

export const Spinner = ({ isFallback }: { isFallback?: boolean }) => {
    return (
        <div className={isFallback ? styles.fallback : ''} data-testid='spinner'>
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