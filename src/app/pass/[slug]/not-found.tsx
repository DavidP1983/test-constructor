
import styles from '@/styles/blocks/notfound.module.scss';

export default function NotFound() {

    return (
        <div className={styles.notfound}>
            <div className={styles.notfound__content}>
                <h2>Test unavailable</h2>
                <p>This test has already been completed or the link has expired.</p>
            </div>
        </div>
    )
}