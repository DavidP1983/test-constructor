import styles from '@/styles/blocks/spinner.module.scss';

export const Spinner = () => {
    return (
        <div>
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