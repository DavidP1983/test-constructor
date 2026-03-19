import clsx from "clsx";
import Link from "next/link";

import styles from '@/styles/flashcard-block/flashdeck.module.scss';

export const FolderMenu = () => {

    return (
        <>
            <li>
                <Link href="#" className={clsx('icon-dot-3', styles.current__link)}></Link>
                <ul className={styles.submenu}>
                    <li><Link href="#">Add card</Link></li>
                    <li><Link href="#">Edit card</Link></li>
                    <li><Link href="#">Delete folder</Link></li>
                </ul>
            </li>
        </>
    )
}