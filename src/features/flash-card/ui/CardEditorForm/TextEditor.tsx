'use client';

import JoditEditor from 'jodit-react';
import { useCallback, useMemo, useRef } from 'react';

import styles from '@/styles/flashcard-block/flashcard.module.scss';


type Props = {
    value?: string;
    onChange: (value: string) => void
}

export const TextEditor = ({ value = '', onChange }: Props) => {
    const editor = useRef(null);

    const config = useMemo(
        () => ({
            readonly: false,
            placeholder: 'Start typing...'
        }),
        []
    );

    // const handleBlur = useCallback((newContent: string) => {
    //     onChange(newContent);
    // }, [onChange]);

    const handleChange = useCallback((newContent: string) => {
        onChange(newContent);
    }, [onChange]);

    return (
        <JoditEditor
            className={styles.editor}
            ref={editor}
            value={value}
            config={config}
            // onBlur={handleBlur}
            onChange={handleChange}
        />
    );
}