import { Spinner } from "@/shared/ui/spinner/Spinner";
import styles from '@/styles/blocks/loading.module.scss';

export default function Loading() {
    return (
        <div className={styles.loading}>
            <Spinner />
        </div>
    )
}