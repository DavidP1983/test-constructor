import { CreateFolderButton, CreateFolderForm } from "@/features/flash/create-folder";
import { Modal } from "@/shared/ui/modal";
import { FlashFolders } from "@/widgets/flash-folders";
import clsx from "clsx";
import Image from "next/image";

import styles from '@/styles/flashcard-block/flashdeck.module.scss';


export const FlashDeck = () => {

    return (
        <section className={styles.deck} aria-labelledby="flash desk" >
            <div className="container">
                <h1 className={clsx('title', styles.title)}>Flashcards</h1>
                <div className={styles.deck__content}>
                    <div className={styles.deck__welcome}>
                        <Image
                            src="/assets/flash-man.webp"
                            width={500}
                            height={200}
                            alt="Flash man"
                            preload />
                        <div className={styles.subtitle}>Welcome to Flashcards!</div>
                        <span className={styles.help}>Create custom cards to help study and memorize better.</span>
                        <CreateFolderButton />
                    </div>
                    <div className={styles.divider}></div>
                    <FlashFolders />
                </div>
            </div>
            <Modal>
                <CreateFolderForm />
            </Modal>
        </section>
    )
}


