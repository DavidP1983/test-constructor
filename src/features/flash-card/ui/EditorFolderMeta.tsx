'use client';

import { IconButton } from '@/shared/ui';
import { useRef } from 'react';
import { useFlashCardStore, useUpsertFlow } from '../model';

import styles from '@/styles/flashcard-block/flashcard.module.scss';

export const EditorFolderMeta = () => {
    const cardFieldsFolderData = useFlashCardStore(state => state.cardFieldsFolderData);
    const { handleEditFolderData, mode, folderData } = useUpsertFlow();
    const titleRef = useRef<HTMLInputElement | null>(null);
    const descRef = useRef<HTMLInputElement | null>(null);


    return (
        <div className={styles.flashcard__breadcrumb_content}>
            <div className={styles.title}>
                <div className={styles.abb} style={{ backgroundColor: folderData.color }}>{folderData.abb}</div>
                <input
                    className={styles.label}
                    value={cardFieldsFolderData.title}
                    name='title'
                    disabled={mode === 'create'}
                    onChange={handleEditFolderData}
                    ref={titleRef}
                />
                {mode === 'edit'
                    &&
                    (<IconButton
                        className={styles.icon}
                        icon={'icon-pencil'}
                        ariaLabel='edit title'
                        onClick={() => titleRef.current?.focus()} />
                    )}
            </div>
            <div>
                <input
                    className={styles.desc}
                    value={cardFieldsFolderData.description ?? ''}
                    name='description'
                    disabled={mode === 'create'}
                    onChange={handleEditFolderData}
                    ref={descRef}
                />
                {mode === 'edit' && (
                    <IconButton
                        className={styles.icon}
                        icon={'icon-pencil'}
                        ariaLabel={'edit description'}
                        onClick={() => descRef.current?.focus()} />
                )}
            </div>
        </div>
    );
}