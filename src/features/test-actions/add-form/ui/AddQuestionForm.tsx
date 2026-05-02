'use client';

import { useModal } from '@/shared/ui/modal/model/modal.store';
import Select from 'react-select';
import { useSaveQuestions } from '../../save-question/lib/hooks/useSaveQuestions';

import styles from '@/styles/blocks/addquestionform.module.scss';


const options = [
    { value: "checkbox", label: 'several answer' },
    { value: "radio", label: 'one answer' },
]

export const AddQuestionForm = () => {
    const {
        handleInputData,
        handleSelectData,
        handleSaveQuestion,
        fields,
        isReadyToSave } = useSaveQuestions();
    const isOpen = useModal(state => state.isOpen)

    return (
        <form className={styles.form}>
            <h2 className={styles.title}>Create your Question</h2>
            <fieldset>
                <div className={styles.form__control}>
                    <label htmlFor="name">Question</label>
                    <input
                        value={fields.input}
                        onChange={handleInputData}
                        type="text"
                        id="name"
                        name="title"
                        required
                        placeholder="type your question..."
                        autoFocus />
                </div>
                <div className={styles.form__control}>
                    <label htmlFor="option">Option</label>
                    <Select
                        className={styles.form__select}
                        key={isOpen ? "open" : "close"}
                        options={options}
                        instanceId={"create-test-select"}
                        placeholder='--Please select answer options--'
                        isSearchable={false}
                        value={fields.select}
                        required
                        onChange={handleSelectData}
                    />
                </div>
                <button
                    type="button"
                    className={styles.button}
                    disabled={isReadyToSave}
                    onClick={handleSaveQuestion}>Save</button>
            </fieldset>
        </form>
    );
}