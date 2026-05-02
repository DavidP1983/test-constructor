'use client';

import { FlashFolderItem, useGetFolders } from "@/entities/flash/flash-folders";
import { GeneralFlashType } from "@/entities/flash/types/flashTypes";
import { FilterSortFolders, useFilterSortSelection } from "@/features/flash/filter-sort-folders";
import { FolderMenu } from "@/features/flash/folder-menu";
import { StatusContent } from "@/shared/ui/status-content";
import { AnimatePresence } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { useGetSelectOptions } from "../model";

import styles from '@/styles/flashcard-block/flashdeck.module.scss';


export const FlashFolders = () => {
    const [filterState, setFilterState] = useState({ search: '', select: '' });
    const { data, error, status } = useGetFolders();
    const options = useGetSelectOptions(data);
    const filteredAndSortedData = useFilterSortSelection(data, filterState);


    return (
        <div className={styles.deck__folders}>
            <h2 className={styles.deck__folders_title}>Your Desk</h2>
            <FilterSortFolders
                options={options}
                filterState={filterState}
                setFilterState={setFilterState} />

            <StatusContent<GeneralFlashType>
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
                                    <FlashFolderItem
                                        folderData={folder}
                                        motionKey={filterState}
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