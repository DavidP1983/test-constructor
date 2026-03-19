'use client';

import { useGetFolders } from "@/entities/flash/model/useGetFolders";
import { DeckFolders } from "@/entities/flash/ui/flash-desk/DeckFolders";
import { FolderMenu } from "@/features/flash/ui/folder-menu/FolderMenu";
import { StatusContent } from "@/shared/ui/status-content/StatusContent";
import Image from "next/image";

import styles from '@/styles/flashcard-block/flashdeck.module.scss';


export const FlashFolders = () => {

    const { data, error, status } = useGetFolders();

    return (
        <div className={styles.deck__folders}>
            <StatusContent
                data={data}
                status={status}
                error={error}
                renderEmpty={() => (
                    <>
                        <Image
                            src="/assets/flash-folder.webp"
                            width={250}
                            height={200}
                            alt="Flash folder" />
                        <div className={styles.subtitle}>No flashcard desks found</div>
                        <span className={styles.help}>Get started by creating your first flashcard desk</span>
                    </>
                )}
                renderData={(data) => (
                    <>
                        <h2 className={styles.deck__folders_title}>Your Desk</h2>
                        <ul className={styles.deck__folders_items}>
                            {data.map(card => (
                                <DeckFolders
                                    folderData={card} key={card._id}
                                    actions={<FolderMenu />} />
                            ))}
                        </ul>
                    </>
                )} />
        </div>

    )
}