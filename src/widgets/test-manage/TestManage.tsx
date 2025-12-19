'use client';
import { AddQuestion } from "@/features/test-actions/add-question/ui/AddQuestion";
import { CheckboxButton } from "@/features/test-actions/question-actions/ui/CheckboxButton";
import { RadioButton } from "@/features/test-actions/question-actions/ui/RadioButton";
import { useTest } from "@/features/test-actions/save-question/model/store";
import { AllTests, Options } from "@/shared/types/test-type";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";
import { Mode, renderActions } from "./renderActions";


import styles from '@/styles/blocks/create.module.scss';


interface Props {
    title: string;
    singleTest?: AllTests;
}

export const TestManage = ({ title, singleTest }: Props) => {
    const { test, setTests, resetTest } = useTest(useShallow((state) => ({
        test: state.test,
        setTests: state.setTests,
        resetTest: state.resetTest,

    })));
    const mode = useSearchParams().get('mode') as Mode;
    const data = mode === 'preview' ? singleTest?.test : test;

    useEffect(() => {
        resetTest();
        if (mode === 'edit' && singleTest) {
            setTests(singleTest)
        }
    }, []);


    const renderQuestionContent = (options: Options[], type: string, id: string) => {

        if (!options?.length) {
            return <div className={styles.create__question_answer}>Please create answers</div>
        }
        return (
            <>
                {
                    options.map(item => (
                        <li key={item.id} className={styles.items}>
                            {
                                type === 'radio'
                                    ?
                                    <RadioButton
                                        label={item.question}
                                        answerId={item.id}
                                        questionId={id}
                                        mode={mode} />
                                    :
                                    <CheckboxButton
                                        label={item.question}
                                        answerId={item.id}
                                        questionId={id}
                                        mode={mode} />}
                        </li>
                    ))
                }
            </>
        )
    }


    return (
        <>

            <main className={styles.main}>
                <section aria-labelledby="create test section" className={styles.create}>
                    <div className="container">
                        <h1 className={clsx("title", styles.title_centre)}>{title}</h1>
                        <div className={styles.create__content}>

                            {
                                singleTest === undefined &&
                                !data?.length &&
                                <div className={styles.create__question_message}>You have no created questions</div>
                            }

                            {data?.map((item, i) => (
                                <div className={styles.create__question} key={item.id}>
                                    <div className={styles.create__question_content}>
                                        <h3 className={styles.create__question_title}>{i + 1}. {item.title}</h3>
                                        <div className={styles.create__question_choice}>{item.instructions}</div>
                                    </div>
                                    <ul className={styles.create__question_field} key={item.id}>
                                        {renderQuestionContent(item.options, item.type, item.id)}
                                    </ul>

                                    <div className={styles.create__question_btn}>
                                        {mode !== 'preview' ?
                                            <AddQuestion testId={item.id} /> :
                                            null
                                        }
                                    </div>

                                </div>
                            ))}
                            {renderActions(mode)}
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
} 