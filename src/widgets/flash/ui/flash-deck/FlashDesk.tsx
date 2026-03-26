import { CreateFolder } from "@/features/flash/ui/deck/create-folder/CreateFolder";
import { CreateFolderForm } from "@/features/flash/ui/deck/create-folder/CreateFolderForm";
import { Modal } from "@/shared/ui/modal/Modal";
import clsx from "clsx";
import Image from "next/image";

import styles from '@/styles/flashcard-block/flashdeck.module.scss';


export const FlashDesk = ({ children }: { children: React.ReactNode }) => {

    return (
        <section className={styles.deck} ria-labelledby="flash desk" >
            <div className="container">
                <h1 className={clsx('title', styles.title)}>Flashcards</h1>
                <div className={styles.deck__content}>
                    <div className={styles.deck__welcome}>
                        <Image
                            src="/assets/flash-man.webp"
                            width={500}
                            height={200}
                            alt="Flash man" />
                        <div className={styles.subtitle}>Welcome to Flashcards!</div>
                        <span className={styles.help}>Create custom cards to help study and memorize better.</span>
                        <CreateFolder />
                    </div>
                    <div className={styles.divider}></div>
                    {children}
                </div>
            </div>
            <Modal>
                <CreateFolderForm />
            </Modal>
        </section>
    )
}


