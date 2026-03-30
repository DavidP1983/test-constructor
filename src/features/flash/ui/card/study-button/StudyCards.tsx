import { useFolderFormContext } from '@/features/flash/model/context/FolderFormContext';
import styles from '@/styles/flashcard-block/flashcard.module.scss';
import Link from 'next/link';

export const StudyButton = () => {
    const { folderData } = useFolderFormContext();
    return (
        <div className={styles.flashcard__breadcrumb_btn}>
            <Link
                href={`/flashcard/study/${folderData._id}`}
                className={styles.study}>Study</Link>
        </div>
    );
}