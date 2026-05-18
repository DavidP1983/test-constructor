import { IconButton } from "@/shared/ui";
import Link from "next/link";
import { useDeleteFolder } from "../model";

import styles from '@/styles/flashcard-block/flashdeck.module.scss';

export const FolderMenu = ({ folderId }: { folderId: string }) => {
    const { handleDeleteFolder } = useDeleteFolder();

    return (
        <>
            <li>
                <IconButton
                    className={styles.dot__btn}
                    icon='icon-dot-3'
                    ariaLabel="More options" />
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