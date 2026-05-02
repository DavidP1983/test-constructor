'use client';

import clsx from 'clsx';
import { useEffect } from 'react';
import { useShallow } from "zustand/shallow";
import { useModal } from '../model/modal.store';


import styles from '@/styles/blocks/modal.module.scss';


export const Modal = ({ children }: { children: React.ReactNode }) => {
    const { isOpen, closeModal } = useModal(useShallow((state) => ({
        isOpen: state.isOpen,
        closeModal: state.closeModal,
    })));

    useEffect(() => {
        if (!isOpen) return;
        document.documentElement.style.overflow = 'hidden';

        return () => { document.documentElement.style.overflow = '' };
    }, [isOpen]);

    return (
        <>
            <div className={clsx(styles.modal, isOpen && styles.open)} aria-modal="true" role='dialog'>
                <div
                    className={clsx(styles.overlay)}
                    onClick={(e) => closeModal(e)}>
                    <div className={styles.inner} data-inner="inner">
                        <div className={styles.modal__close} data-close=''>&times;</div>
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}

