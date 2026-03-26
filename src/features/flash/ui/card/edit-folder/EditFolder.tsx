'use client';

import { useFolderFormContext } from '@/features/flash/model/context/FolderFormContext';
import clsx from 'clsx';
import { useRef } from 'react';

import styles from '@/styles/flashcard-block/flashcard.module.scss';

export const EditFolder = () => {
    const { folderEditData, handleEditFolderData, folderData, mode } = useFolderFormContext();
    const titleRef = useRef<HTMLInputElement | null>(null);
    const descRef = useRef<HTMLInputElement | null>(null);


    return (
        <div className={styles.flashcard__breadcrumb_content}>
            <div className={styles.title}>
                <div className={styles.abb} style={{ backgroundColor: folderData.color }}>{folderData.abb}</div>
                <input
                    className={styles.label}
                    value={folderEditData.title}
                    name='title'
                    disabled={mode === 'create'}
                    onChange={handleEditFolderData}
                    ref={titleRef}
                />
                {mode === 'edit' && (
                    <button
                        className={clsx('icon-pencil', styles.icon)}
                        aria-label='edit title'
                        onClick={() => titleRef.current?.focus()}
                    />
                )}
            </div>
            <div>
                <input
                    className={styles.desc}
                    value={folderEditData.description}
                    name='description'
                    disabled={mode === 'create'}
                    onChange={handleEditFolderData}
                    ref={descRef}
                />
                {mode === 'edit' && (
                    <button
                        className={clsx('icon-pencil', styles.icon)}
                        aria-label='edit description'
                        onClick={() => descRef.current?.focus()}
                    />
                )}
            </div>
        </div>
    );
}