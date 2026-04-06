'use client';
import { difficultyOptions, exampleOptions, languageOptions } from '@/features/flash/constants/card';
import { useFolderFormContext } from '@/features/flash/model/context/FolderFormContext';
import { Difficulty, Example, Language, SelectOptions } from '@/shared/types/select.types';
import { SpinnerForBtn } from '@/shared/ui/spinner/SpinnerForBtn';
import { useEffect, useRef } from 'react';
import Select from 'react-select';
import { TextEditor } from './TextEditor';

import styles from '@/styles/flashcard-block/flashcard.module.scss';


export const CardForm = () => {
    const {
        isOpenFormEditor,
        formFieldsData,
        handleCardFormInputData,
        handleCardFormSelectData,
        handleTextEditorChange,
        handleUpsert,
        handleDiscardChanges,
        isPendingCreate,
        isPendingUpdate,
        mode
    } = useFolderFormContext();

    const myRef = useRef<HTMLTextAreaElement | null>(null);


    useEffect(() => {
        const elem = myRef.current;
        const media = window.matchMedia("(width <= 992px)");
        if (elem && isOpenFormEditor && media.matches) {
            elem.scrollIntoView({ behavior: 'smooth', block: 'start' })
            elem.focus();
        } else {
            elem?.focus();
        }
    }, [isOpenFormEditor]);


    return (
        <form className={styles.block__editor_form} onSubmit={(e) => handleUpsert('form', e)}>
            {mode === 'edit' && <div className={styles.notify}>*Edit one card at a time</div>}
            <div className={styles.fields_item}>
                <label htmlFor="question">Question</label>
                <textarea
                    ref={myRef}
                    value={formFieldsData.question}
                    onChange={handleCardFormInputData}
                    spellCheck='true'
                    id="question"
                    name="question"
                    required
                    placeholder="type your question here..." />
            </div>
            <div className={styles.fields_item}>
                <label htmlFor="answer">Answer</label>
                <TextEditor
                    value={formFieldsData.answer}
                    onChange={(value: string) => handleTextEditorChange('answer', value)}
                />
            </div>
            <div className={styles.fields_item}>
                <label htmlFor="difficulty">Question difficulty</label>
                <Select <SelectOptions<Difficulty>, false>
                    options={difficultyOptions}
                    className={styles.select}
                    isSearchable={false}
                    name='difficulty'
                    required
                    placeholder="--Choice question difficulty--"
                    instanceId='difficulty'
                    id='difficulty'
                    value={
                        formFieldsData.difficulty ?
                            difficultyOptions.find(o => o.value === formFieldsData.difficulty)
                            : null
                    }
                    onChange={(option) => {
                        if (option) handleCardFormSelectData('difficulty', option.value)
                    }}
                />
            </div>
            <div className={styles.fields_item}>
                <label htmlFor="language">Text Language</label>
                <Select <SelectOptions<Language>, false>
                    options={languageOptions}
                    className={styles.select}
                    isSearchable={false}
                    name='lang'
                    required
                    placeholder="--Choice Text language--"
                    instanceId='language'
                    id='language'
                    value={
                        formFieldsData.lang ?
                            languageOptions.find(o => o.value === formFieldsData.lang)
                            : null
                    }
                    onChange={(option) => {
                        if (option) handleCardFormSelectData('lang', option.value)
                    }}
                />
            </div>
            <div className={styles.fields_item}>
                <label htmlFor="type">Example Type</label>
                <Select <SelectOptions<Example>, false>
                    options={exampleOptions}
                    className={styles.select}
                    isSearchable={false}
                    name='type'
                    placeholder="--Choice example type (optional)--"
                    instanceId='type'
                    id='type'
                    value={
                        formFieldsData.type ?
                            exampleOptions.find(o => o.value === formFieldsData.type)
                            : null
                    }
                    onChange={(option) => {
                        if (option) handleCardFormSelectData('type', option.value)
                    }}
                />
            </div>

            <div className={styles.fields_item}>
                <label htmlFor="example">Example</label>
                <textarea
                    value={formFieldsData.example ?? ''}
                    onChange={handleCardFormInputData}
                    spellCheck='true'
                    id="example"
                    name="example"
                    placeholder="type answer examples here (optional)..." />
            </div>
            <div className={styles.fields_item}>
                <label htmlFor="image">Image URL</label>
                <input
                    value={formFieldsData.img ?? ''}
                    onChange={handleCardFormInputData}
                    type="text"
                    id="image"
                    name="image"
                    placeholder="Past image url address (optional)" />
            </div>
            <div className={styles.btn__group}>
                <button
                    className={styles.save}
                    disabled={isPendingCreate}
                    type='submit'>
                    {isPendingCreate || isPendingUpdate ? <>Saving... <SpinnerForBtn color={'hsl(220, 13%, 96%)'} /></> : 'Save card'}
                </button>
                <button
                    className={styles.discard}
                    type='button'
                    onClick={handleDiscardChanges}>
                    Discard
                </button>
            </div>
        </form>
    );
}