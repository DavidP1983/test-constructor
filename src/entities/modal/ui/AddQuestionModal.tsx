'use client';

import styles from '@/styles/blocks/modal.module.scss';
import clsx from 'clsx';
import { useShallow } from "zustand/shallow";
import { useModal } from '../model/store';


interface Props {
    children: React.ReactNode;
}

export const AddQuestionModal = ({ children }: Props) => {
    const { isOpen, openModal, closeModal } = useModal(useShallow((state) => ({
        isOpen: state.isOpen,
        openModal: state.openModal,
        closeModal: state.closeModal,
    })));

    return (
        <section className={styles.modal} aria-labelledby="modal window">
            <div
                className={clsx(styles.overlay, isOpen && styles.active)}
                onClick={(e) => closeModal(e)}>
                <div className={styles.inner} data-inner="inner">
                    <div className={styles.modal__close} data-close=''>&times;</div>
                    {children}
                </div>
            </div>
            <button
                className={styles.create__btn}
                onClick={() => openModal(true)}
            >
            </button>
        </section>
    );
}