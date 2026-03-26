'use client';

import { useGetFolders } from "@/entities/flash/model/useGetFolders";
import { DeckFolders } from "@/entities/flash/ui/deck/flash-desk/DeckFolders";
import { useFilterSortSelection } from "@/features/flash/model/deck/useFilterSortSelection";
import { FilterSortFolders } from "@/features/flash/ui/deck/filter-sort-folders/FilterSortFolders";
import { FolderMenu } from "@/features/flash/ui/deck/folder-menu/FolderMenu";
import { StatusContent } from "@/shared/ui/status-content/StatusContent";
import { AnimatePresence } from "motion/react";
import Image from "next/image";
import { useState } from "react";

import styles from '@/styles/flashcard-block/flashdeck.module.scss';


export const FlashFolders = () => {
    const [searchData, setSearchData] = useState({ search: '', select: '' });
    const { data, error, status } = useGetFolders();
    const filteredAndSortedData = useFilterSortSelection(data, searchData);

    return (
        <div className={styles.deck__folders}>
            <h2 className={styles.deck__folders_title}>Your Desk</h2>
            <FilterSortFolders
                data={data}
                searchData={searchData}
                setSearchData={setSearchData} />

            <StatusContent
                data={filteredAndSortedData}
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
                        <AnimatePresence>
                            <ul
                                className={styles.deck__folders_items}>
                                {data.map(folder => (
                                    <DeckFolders
                                        folderData={folder}
                                        motionKey={searchData}
                                        key={folder._id}
                                        actions={<FolderMenu folderId={folder._id} />} />
                                ))}
                            </ul>
                        </AnimatePresence>
                    </>
                )} />
        </div>

    )
}