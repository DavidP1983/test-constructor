'use client';

import { Button } from '@/shared/ui/button/Button';
import { SpinnerForBtn } from '@/shared/ui/spinner/SpinnerForBtn';
import { useCreateFolderFormLogic } from '../model';

import styles from '@/styles/flashcard-block/flashdeck.module.scss';


export const CreateFolderForm = () => {
    const { handleInputData, handleFormSubmit, fieldsValue, isPending } = useCreateFolderFormLogic();

    return (
        <form className={styles.deck__form} onSubmit={handleFormSubmit}>
            <div className={styles.deck__form_field}>
                <label htmlFor="title">Folder title</label>
                <input
                    className={styles.input}
                    value={fieldsValue.title}
                    onChange={handleInputData}
                    type="text"
                    id="title"
                    name="title"
                    required
                    placeholder="Folder title..." />
            </div>
            <div className={styles.deck__form_field}>
                <label htmlFor="abb">Folder abbreviation</label>
                <input
                    className={styles.input}
                    value={fieldsValue.abb}
                    onChange={handleInputData}
                    type="text"
                    id="abb"
                    name="abb"
                    maxLength={4}
                    required
                    placeholder="Max 4 symbols available" />
            </div>
            <div className={styles.deck__form_field}>
                <label htmlFor="color">Folder color</label>
                <input
                    className={styles.input}
                    value={fieldsValue.color}
                    onChange={handleInputData}
                    type="color"
                    id="color"
                    name="color"
                    required
                    placeholder="Select folder color" />
            </div>
            <div className={styles.deck__form_field}>
                <label htmlFor="desc">Folder description</label>
                <input
                    className={styles.input}
                    value={fieldsValue.desc}
                    onChange={handleInputData}
                    type="text"
                    id="desc"
                    name="desc"
                    required
                    placeholder="Short description (optional)" />
            </div>
            <div className={styles.deck__form_field}>
                <label htmlFor="tag">Tag</label>
                <input
                    className={styles.input}
                    value={fieldsValue.tag}
                    onChange={handleInputData}
                    type="text"
                    id="tag"
                    name="tag"
                    required
                    placeholder="Add a tag to categorize your folder (optional)" />
                <div className={styles.helper}>*Use tags to categorize your folder, e.g., IT, Math, Geography...</div>
            </div>
            <Button
                type="submit"
                disabled={isPending}>
                {isPending ? <>Submitting... <SpinnerForBtn /></> : 'Submit form'}
            </Button>
        </form>
    )
}