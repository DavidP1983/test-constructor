import { GeneralFlashType } from "@/entities/flash/types/flashTypes";
import { FlashcardHeader } from "@/widgets/flash/ui/flash-card/flashcard-header/FlashcardHeader";
import Link from "next/link";


import styles from '@/styles/flashcard-block/flashcard.module.scss';

interface Props {
    folderData: GeneralFlashType;
    collectStatus: Record<string, "repeat" | "known">;
}

export const FlashStudyHeader = ({ folderData, collectStatus }: Props) => {
    const isDirty = Object.keys(collectStatus)?.length;

    return (
        <FlashcardHeader
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
            <div className={styles.flashcard__breadcrumb_content}>
                <div className={styles.title}>
                    <div className={styles.abb} style={{ backgroundColor: folderData.color }}>{folderData.abb}</div>
                    <div className={styles.label}>{folderData.title}</div>
                </div>
                <div className={styles.desc}>{folderData.description ?? ''}</div>
            </div>
        </FlashcardHeader>
    );
}