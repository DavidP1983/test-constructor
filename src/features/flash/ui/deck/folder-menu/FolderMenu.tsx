import { useDeleteFolder } from "@/features/flash/model/deck/useDeleteFolder";
import clsx from "clsx";
import Link from "next/link";

import styles from '@/styles/flashcard-block/flashdeck.module.scss';

export const FolderMenu = ({ folderId }: { folderId: string }) => {
    const { handleDeleteFolder } = useDeleteFolder();

    return (
        <>
            <li>
                <button
                    className={clsx('icon-dot-3', styles.dot__btn)}
                    aria-label="More options" />
                <ul className={styles.submenu}>
                    <li>
                        <Link href={`flashcard/${folderId}?mode=create`}>Add card</Link>
                    </li>
                    <li>
                        <Link href={`flashcard/${folderId}?mode=edit`}>Edit card</Link>
                    </li>
                    <li>
                        <button
                            type="button"
                            onClick={() => handleDeleteFolder(folderId)}>Delete folder</button>
                    </li>
                </ul>
            </li>
        </>
    )
}