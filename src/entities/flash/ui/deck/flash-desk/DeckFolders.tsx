import { motion } from 'motion/react';
import { GeneralFlashType } from '../../../types/flashTypes';
import { getTimeAgo } from '../../../utils/getTimeAgo';

import styles from '@/styles/flashcard-block/flashdeck.module.scss';


export const DeckFolders = (
    { folderData, actions, motionKey }:
        {
            folderData: GeneralFlashType,
            actions: React.ReactNode,
            motionKey: { search: string, select: string }
        }) => {


    const date = getTimeAgo(folderData.createdAt);

    return (
        <>
            <motion.li
                key={`${folderData._id}-${motionKey.search}-${motionKey.select}`}
                initial={{ opacity: 0, scale: 0.50 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.50 }}
                transition={{ duration: 0.11, ease: 'linear' }}
                layout
                className={styles.deck__folders_item}>
                <div
                    className={styles.deck__folders_abr}
                    style={{ backgroundColor: `${folderData?.color ? folderData.color : '#FED650'}` }}>{folderData.abb}
                </div>
                <div className={styles.deck__folders_desc}>
                    <div className={styles.title}>{folderData.title}</div>
                    <div className={styles.time}>
                        <div>{folderData.cards?.length} cards</div>
                        <span>•</span>
                        <time dateTime={folderData.createdAt}>{date}</time>
                    </div>
                </div>
                <button className={styles.study}>Study</button>
                <ul className={styles.dot}>
                    {actions}
                </ul>
            </motion.li>
        </>
    )
}