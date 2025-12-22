import { BackButton } from "@/features/navigation/ui/BackButton";

import styles from '@/styles/blocks/notfound.module.scss';

export default function NotFound() {

    return (
        <div className={styles.notfound}>
            <div className={styles.notfound__content}>
                <h2>Not Found Error 404</h2>
                <p>Could not find requested resource</p>
                <BackButton>Return Home</BackButton>
            </div>
        </div>
    )
}