'use client';

import clsx from 'clsx';
import { useEffect, useId, useRef, useState } from 'react';
import Select from 'react-select';
import { useSaveQuestions } from '../../save-question/lib/hooks/useSaveQuestions';

import styles from '@/styles/blocks/addquestion.module.scss';


const options = [
    { value: true, label: 'true' },
    { value: false, label: 'false' },
]

export const AddQuestion = ({ testId }: { testId: string }) => {
    const [isOpen, setIsOpen] = useState(false)
    const {
        handleInputData,
        handleSelectData,
        handleSaveAnswers,
        handleEditData,
        handleDeleteQuestion,
        isReadyToSave,
        fields,
        setFields,
        editField,
        editFieldToggle
    } = useSaveQuestions(testId);

    const id = useId();
    const myRef = useRef<HTMLTextAreaElement | null>(null);

    // Effect для фокуса textArea и очистки поля после editFieldToggle
    useEffect(() => {
        if (isOpen && myRef?.current) {
            setFields({
                input: '',
                select: null
            });
            myRef.current.focus()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);


    // Effect для фокуса textArea вставки исправляемого значения
    useEffect(() => {
        if (editFieldToggle) {
            setFields({
                input: editField?.label,
                select: null
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editField, testId])

    return (
        <>
            <div className={clsx(styles.create__question, (isOpen || editFieldToggle) && styles.active)}>
                <textarea
                    value={fields.input}
                    name="question"
                    id={id}
                    maxLength={300}
                    ref={myRef}
                    placeholder="type an answer..."
                    required
                    onChange={handleInputData}></textarea>
                <Select
                    className={styles.create__question_select}
                    options={options}
                    placeholder='--Select the correct answer--'
                    isSearchable={false}
                    instanceId={id}
                    value={fields.select}
                    required
                    onChange={handleSelectData} />
                <button
                    className={styles.create__question_save}
                    disabled={isReadyToSave}
                    onClick={editFieldToggle ? handleEditData : handleSaveAnswers}
                >Save</button>
            </div>
            <div className={styles.btn__group}>
                <button
                    className={styles.btn__group_add}
                    disabled={editFieldToggle}
                    onClick={() => setIsOpen(prev => !prev)}>+ Add</button>
                <button
                    className={styles.btn__group_delete}
                    disabled={editFieldToggle}
                    onClick={handleDeleteQuestion}>Delete</button>
            </div>
        </>
    );
}
