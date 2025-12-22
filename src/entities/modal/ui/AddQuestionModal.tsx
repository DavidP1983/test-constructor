'use client';

import clsx from 'clsx';
import { useShallow } from "zustand/shallow";
import { useModal } from '../model/store';
import { AddQuestionModalButton } from './AddQuestionModalButton';

import styles from '@/styles/blocks/modal.module.scss';

interface Props {
    children: React.ReactNode;
}

export const AddQuestionModal = ({ children }: Props) => {
    const { isOpen, closeModal } = useModal(useShallow((state) => ({
        isOpen: state.isOpen,
        closeModal: state.closeModal,
    })));

    return (
        <>
            {
                isOpen && (
                    <section className={styles.modal} aria-labelledby="modal window">
                        <div
                            className={clsx(styles.overlay, isOpen && styles.active)}
                            onClick={(e) => closeModal(e)}>
                            <div className={styles.inner} data-inner="inner">
                                <div className={styles.modal__close} data-close=''>&times;</div>
                                {children}
                            </div>
                        </div>
                    </section>

                )
            }
            <AddQuestionModalButton />
        </>
    );
}

