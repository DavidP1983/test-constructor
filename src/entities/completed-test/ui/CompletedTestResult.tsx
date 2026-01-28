import { TestPassResultProps } from "@/widgets/test-result/ui/TestPassResult";

import styles from '@/styles/blocks/create.module.scss';


export const CompletedTestResult = ({ originTest, completedTest }: TestPassResultProps) => {

    return (
        <>
            {
                originTest?.test?.map((item, i) => (
                    <div
                        className={styles.create__question}
                        key={item.id}
                        style={{ margin: '0px 0px 20px', padding: '25px', userSelect: 'none' }}>

                        <div className={styles.create__question_content}>
                            <h3 className={styles.create__question_title}>{i + 1}. {item.title}</h3>
                            <div className={styles.create__question_choice}>{item.instructions}</div>
                        </div>
                        <ul className={styles.create__question_field} >
                            {
                                item.options.map(({ question, answer, id }) => (
                                    <li
                                        key={id} className={styles.items}>
                                        {
                                            <label
                                                htmlFor={id}
                                                className={item.type === 'radio' ? styles.radioContainer : styles.checkboxContainer}>{question}
                                                {' '}
                                                <input
                                                    type={item.type}
                                                    id={id}
                                                    name={item.id}
                                                    value={id}
                                                    checked={completedTest.answers[i]?.selectedOptions.includes(id)}
                                                    readOnly
                                                />
                                                <span className={styles.checkmark}></span>
                                            </label>
                                        }
                                        <span className={answer ? styles.isCorrect : styles.isInCorrect}>{answer ? "correct" : 'incorrect'}</span>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                ))
            }
        </>
    )
}