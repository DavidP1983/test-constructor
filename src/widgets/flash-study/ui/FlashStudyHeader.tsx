import { GeneralFlashType } from "@/entities/flash-folder/model/types/folder.types";
import { StudyMeta } from "@/entities/flash-study";
import { FlashHeader } from "@/shared/ui";
import Link from "next/link";
import { CollectStatusType } from "../model/types/flash.study.types";

import styles from '@/styles/flashcard-block/flashcard.module.scss';

interface Props {
    folderData: GeneralFlashType;
    collectStatus: CollectStatusType
}

export const FlashStudyHeader = ({ folderData, collectStatus }: Props) => {
    const isDirty = Object.keys(collectStatus)?.length;

    return (
        <FlashHeader
            backButtonElement={
                <Link
                    href='/flashcard'
                    className={styles.back}
                    title={isDirty ? 'you have unsaved changes, click to back to cards' : 'back to flashcard'}
                    onClick={(e) => {
                        if (isDirty) {
                            e.preventDefault();
                        }
                    }}>
                    <span className="icon-left-open"></span>
                    FlashCards
                </Link>
            }
        >
            <StudyMeta folderData={folderData} />
        </FlashHeader>
    );
}