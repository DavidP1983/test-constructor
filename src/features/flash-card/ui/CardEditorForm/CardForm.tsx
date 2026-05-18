'use client';
import { SelectOptions } from '@/shared/types/select.types';
import { SpinnerForBtn } from '@/shared/ui/spinner/SpinnerForBtn';
import { useEffect, useRef } from 'react';
import Select from 'react-select';
import { difficultyOptions, exampleOptions, languageOptions, useFlashCardContext, useFlashCardStore, useUpsertFlow } from '../../model';
import { Difficulty, Example, Language } from '../../model/types/select.types';
import { TextEditor } from './TextEditor';

import { Button } from '@/shared/ui/button/Button';
import styles from '@/styles/flashcard-block/flashcard.module.scss';


export const CardForm = () => {
    const {
        mode,
        handleCardFormInputData,
        handleCardFormSelectData,
        handleTextEditorChange,
        handleDiscardChanges,
        isPendingCreate,
        isPendingUpdate,
        handleUpsert
    } = useUpsertFlow();

    const { isOpenFormEditor } = useFlashCardContext();
    const cardFieldsData = useFlashCardStore((state) => state.cardFieldsData);

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
                    value={cardFieldsData.question}
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
                    value={cardFieldsData.answer}
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
                        cardFieldsData.difficulty ?
                            difficultyOptions.find(o => o.value === cardFieldsData.difficulty)
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
                        cardFieldsData.lang ?
                            languageOptions.find(o => o.value === cardFieldsData.lang)
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
                        cardFieldsData.type ?
                            exampleOptions.find(o => o.value === cardFieldsData.type)
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
                    value={cardFieldsData.example ?? ''}
                    onChange={handleCardFormInputData}
                    spellCheck='true'
                    id="example"
                    name="example"
                    placeholder="type answer examples here (optional)..." />
            </div>
            <div className={styles.fields_item}>
                <label htmlFor="image">Image URL</label>
                <input
                    value={cardFieldsData.img ?? ''}
                    onChange={handleCardFormInputData}
                    type="text"
                    id="image"
                    name="image"
                    placeholder="Past image url address (optional)" />
            </div>
            <div className={styles.btn__group}>
                <Button
                    className={styles.save}
                    size='md'
                    variant='primary'
                    disabled={isPendingCreate}
                    type='submit'>
                    {isPendingCreate || isPendingUpdate ? <>Saving... <SpinnerForBtn color={'hsl(220, 13%, 96%)'} /></> : 'Save card'}
                </Button>
                <Button
                    className={styles.discard}
                    size='md'
                    type='button'
                    onClick={handleDiscardChanges}>
                    Discard
                </Button>
            </div>
        </form>
    );
}