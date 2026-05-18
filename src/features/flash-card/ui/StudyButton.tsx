import Link from 'next/link';
import { useUpsertFlow } from '../model';

import styles from '@/styles/flashcard-block/flashcard.module.scss';

export const StudyButton = () => {
    const { folderData } = useUpsertFlow();

    return (
        <div className={styles.flashcard__breadcrumb_btn}>
            <Link
                href={`/flashcard/study/${folderData._id}`}
                className={styles.study}>Study</Link>
        </div>
    );
}