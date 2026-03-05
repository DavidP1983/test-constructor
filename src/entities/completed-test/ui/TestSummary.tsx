import { TestPassResultProps } from "@/widgets/test-result/ui/TestPassResult";
import clsx from "clsx";
import { formatDate, formatDuration } from "../utils/formatter";


import styles from '@/styles/blocks/summary.module.scss';

export const TestSummary = ({ completedTest }: Omit<TestPassResultProps, "originTest">) => {

    const {
        candidateName,
        candidateEmail,
        testName,
        status,
        score,
        correctAnswers,
        totalQuestions,
        duration,
        completedAt
    } = completedTest ?? {};


    const formattedDuration = formatDuration(duration);
    const formattedDate = formatDate(completedAt);
    const incorrectAnswers = completedTest.answers.length - correctAnswers;

    return (
        <div className={styles.summary__block}>
            <h2 className={clsx('title', styles.summary__title)}>Test Summary</h2>
            <ul className={styles.summary__desc}>
                <li><strong>Candidate: </strong><span>{candidateName}</span></li>
                <li><strong>Candidate Email: </strong><span>{candidateEmail}</span></li>
                <li><strong>Test: </strong><span>{testName}</span></li>
                <li><strong>Status:</strong><span>{status === 'passed' ? 'PASSED ✅ ' : 'FAILED ❌'}</span></li>
                <li><strong>Score: </strong><span>{score}%</span></li>
                <li><strong>Correct: </strong><span>{correctAnswers} / {totalQuestions}</span></li>
                <li><strong>Duration: </strong><span>{formattedDuration}</span></li>
                <li><strong>Completed: </strong><span>{completedAt}</span></li>
            </ul>
            <ul className={styles.summary__result}>
                <li><span>🟢</span>Correct answers: {correctAnswers}</li>
                <li><span>🔴 </span>Incorrect answers: {incorrectAnswers}</li>
            </ul>
            {status === 'failed' &&
                (
                    <span className={clsx("icon-warning-empty", styles.summary__waring)}>Candidate has already received a failure notification email,  <strong>{formattedDate}</strong>.</span>
                )
            }
        </div>
    )
}