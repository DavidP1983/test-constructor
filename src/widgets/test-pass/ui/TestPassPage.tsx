'use client';
import { TestQuestionItem } from '@/features/test-questions/ui/TestQuestionItem';
import { AllTests } from '@/shared/types/test-type';
import { SpinnerForBtn } from '@/shared/ui/spinner/SpinnerForBtn';
import clsx from 'clsx';
import { useId } from 'react';
import { useTestPassPage } from '../model/useTestPassPage';
import { TestProgress } from './TestProgress';


import styles from '@/styles/blocks/create.module.scss';



export const TestPassPage = ({ data, linkId }: { data: AllTests, linkId: string }) => {
    const ids = useId();
    const {
        handleCandidateData,
        isLoading,
        handleChange,
        handleSaveAnswers,
        answers
    } = useTestPassPage(data, linkId)


    return (
        <main className={styles.main}>
            <section aria-labelledby="pass test section" className={styles.create}>
                <div className="container">

                    <TestProgress
                        total={data.test}
                        current={answers.length - 1}
                    />

                    <h1 className={clsx("title", styles.title_centre)}>{data.name}</h1>
                    <div className={styles.candidate__data}>
                        <label htmlFor={ids} className={styles.candidate__input}>Candidate name
                            <input
                                type="text"
                                id={ids}
                                name="name"
                                required
                                onChange={handleCandidateData} />
                        </label>
                        <label htmlFor={ids} className={styles.candidate__input}>Candidate Email
                            <input
                                type="email"
                                id={ids}
                                name="email"
                                required
                                onChange={handleCandidateData} />
                        </label>
                    </div>

                    <div
                        className={styles.create__content}
                        style={{ background: 'white', padding: '20px', marginTop: '20px' }}>

                        {
                            data?.test?.map((item, i) => (
                                <div
                                    className={styles.create__question}
                                    key={item.id}
                                    style={{ margin: '0px 0px 20px', padding: '25px', userSelect: 'none' }}>

                                    <div className={styles.create__question_content}>
                                        <h3 className={styles.create__question_title}>{i + 1}. {item.title}</h3>
                                        <div className={styles.create__question_choice}>{item.instructions}</div>
                                    </div>
                                    <ul className={styles.create__question_field} >
                                        <TestQuestionItem
                                            options={item.options}
                                            type={item.type}
                                            id={item.id}
                                            mode={'pass'}
                                            handleAnswerChange={handleChange}
                                        />
                                    </ul>

                                </div>
                            ))
                        }
                        <button
                            className={styles.send__answers}
                            disabled={isLoading}
                            onClick={handleSaveAnswers}>
                            {
                                isLoading ?
                                    (<div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', }}>Sending... <SpinnerForBtn /></div>)
                                    : ('Send answers')
                            }
                        </button>
                    </div>
                </div>
            </section>
        </main>
    )
}