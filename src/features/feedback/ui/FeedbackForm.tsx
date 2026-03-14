'use client';

import { SpinnerForBtn } from '@/shared/ui/spinner/SpinnerForBtn';
import clsx from 'clsx';
import { motion } from 'motion/react';
import { selectFields, socialLinks } from '../constants/map-data';
import { useFeedbackForm } from '../model/useFeedbackForm';
import { formVariants } from './formVariants';
import { renderSelect } from './renderSelect';

import styles from '@/styles/blocks/feedback.module.scss';


export const FeedbackForm = () => {

    const {
        handleInputData,
        handleSelectFieldsData,
        handleSubmitForm,
        fieldsValue,
        selectValueFields,
        loading,
        error } = useFeedbackForm();

    return (
        <section className={styles.form} aria-label="Feedback form">
            <div className={styles.form__icons}>
                <h2>My contacts</h2>
                <ul className={styles.icons}>
                    {
                        socialLinks.map(item => (
                            <li key={item.id}>
                                <a
                                    href={item.href}
                                    title={item.title}
                                    rel='noopener noreferrer'
                                    target='_blank'>
                                    <span className={item.icon}></span>
                                    <div className={styles.line}></div>
                                </a>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className="container">
                <motion.div
                    className={styles.form__content}
                    variants={formVariants}
                    initial='hidden'
                    animate='visible'>

                    <h1 className={clsx('title', styles.form__title)}>Form feedback</h1>
                    <form className={styles.form__fields} onSubmit={handleSubmitForm}>
                        <div className={styles.form__fields_item}>
                            <label htmlFor="name">Name</label>
                            <input
                                className={styles.input}
                                value={fieldsValue.name}
                                onChange={handleInputData}
                                type="text"
                                id="name"
                                name="name"
                                required
                                placeholder="type your name..." />
                        </div>
                        {selectFields.map(field => (
                            <div className={styles.form__fields_item} key={field.id}>
                                <label htmlFor={field.type}>{field.label}</label>
                                {renderSelect({
                                    type: field.type,
                                    filterIds: field.type,
                                    className: styles.select,
                                    valueFields: selectValueFields,
                                    cb: handleSelectFieldsData
                                })}
                            </div>
                        ))}

                        <div className={styles.form__fields_item}>
                            <label htmlFor="rate">Rate the project</label>
                            <div className={styles.radio}>
                                <ul>
                                    {Array.from({ length: 5 }, (_, i) => (
                                        <li key={i}>
                                            <input
                                                type="radio"
                                                id={`option-${i + 1}`}
                                                name="rate"
                                                value={i + 1}
                                                checked={Number(fieldsValue.rate) === i + 1 ? true : false}
                                                onChange={handleInputData} />
                                            <label htmlFor={`option-${i + 1}`}>{i + 1}</label>
                                            <div className={styles.check}></div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className={styles.form__fields_item}>
                            <label htmlFor="textarea">What should be improved?</label>
                            <textarea
                                className={styles.textarea}
                                value={fieldsValue.textarea}
                                onChange={handleInputData}
                                spellCheck='true'
                                id="textarea"
                                name="textarea"
                                placeholder="type comment..." />
                        </div>
                        <span className={styles.form__error}>{error}</span>
                        <button
                            className={clsx(styles.form__btn)}
                            type="submit"
                            disabled={loading}>
                            {loading ? <>Submitting... <SpinnerForBtn /></> : 'Submit form'}
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    )
}

