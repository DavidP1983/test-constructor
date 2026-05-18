import { GeneralFlashType } from '@/entities/flash-folder/model/types/folder.types';
import styles from '@/styles/flashcard-block/flashcard.module.scss';

export const StudyMeta = ({ folderData }: { folderData: GeneralFlashType }) => {

    return (
        <div className={styles.flashcard__breadcrumb_content}>
            <div className={styles.title}>
                <div className={styles.abb} style={{ backgroundColor: folderData.color }}>{folderData.abb}</div>
                <div className={styles.label}>{folderData.title}</div>
            </div>
            <div className={styles.desc}>{folderData.description ?? ''}</div>
        </div>
    );
}