'use client';

import clsx from 'clsx';
import { useShallow } from "zustand/shallow";
import { useModal } from './model/modal.store';


import styles from '@/styles/blocks/modal.module.scss';


export const Modal = ({ children }: { children: React.ReactNode }) => {
    const { isOpen, closeModal } = useModal(useShallow((state) => ({
        isOpen: state.isOpen,
        closeModal: state.closeModal,
    })));

    return (
        <>
            {
                isOpen && (
                    <div className={styles.modal} aria-modal="true" role='dialog'>
                        <div
                            className={clsx(styles.overlay, isOpen && styles.active)}
                            onClick={(e) => closeModal(e)}>
                            <div className={styles.inner} data-inner="inner">
                                <div className={styles.modal__close} data-close=''>&times;</div>
                                {children}
                            </div>
                        </div>
                    </div>

                )
            }
        </>
    );
}

