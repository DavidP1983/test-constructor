import { GeneralFlashType } from '../../types/flashTypes';
import { getTimeAgo } from '../../utils/getTimeAgo';

import styles from '@/styles/flashcard-block/flashdeck.module.scss';


export const DeckFolders = (
    { folderData, actions }: { folderData: GeneralFlashType, actions: React.ReactNode }) => {


    const date = getTimeAgo(folderData.createdAt);

    return (
        <>
            <li className={styles.deck__folders_item}>
                <div
                    className={styles.deck__folders_abr}
                    style={{ backgroundColor: `${folderData?.color ? folderData.color : '#FED650'}` }}>{folderData.abb}</div>
                <div className={styles.deck__folders_desc}>
                    <div className={styles.title}>{folderData.title}</div>
                    <div className={styles.time}>
                        <div>{folderData.cards?.length} cards</div>
                        <span>•</span>
                        <span>{date}</span>
                    </div>
                </div>
                <button className={styles.study}>Study</button>
                <ul className={styles.dot}>
                    {actions}
                </ul>
            </li>
        </>
    )
}