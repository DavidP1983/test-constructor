import { TestPassResultProps } from "@/widgets/test-result/ui/TestPassResult";
import clsx from "clsx";


import styles from '@/styles/blocks/summary.module.scss';

export const TestSummary = ({ completedTest }: Omit<TestPassResultProps, "originTest">) => {

    const {
        candidateName,
        testName,
        status,
        score,
        correctAnswers,
        totalQuestions,
        duration,
        completedAt
    } = completedTest ?? {};


    const formatDuration = (seconds: number | null | undefined): string => {
        if (!seconds || seconds < 0) return "00:00";
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    const incorrectAnswers = completedTest.answers.length - correctAnswers;

    return (
        <section aria-labelledby="test summary" className={styles.summary}>
            <div className="container">
                <div className={styles.summary__center}>
                    <div className={styles.summary__content}>
                        <h2 className={clsx('title', styles.summary__title)}>Test Summary</h2>
                        <ul className={styles.summary__desc}>
                            <li><strong>Candidate: </strong><span>{candidateName}</span></li>
                            <li><strong>Test: </strong><span>{testName}</span></li>
                            <li><strong>Status:</strong><span>{status === 'passed' ? 'PASSED ✅ ' : 'FAILED ❌'}</span></li>
                            <li><strong>Score: </strong><span>{score}%</span></li>
                            <li><strong>Correct: </strong><span>{correctAnswers} / {totalQuestions}</span></li>
                            <li><strong>Duration: </strong><span>{formatDuration(duration)}</span></li>
                            <li><strong>Completed: </strong><span>{completedAt}</span></li>
                        </ul>
                        <ul className={styles.summary__result}>
                            <li><span>🟢</span>Correct answers: {correctAnswers}</li>
                            <li><span>🔴 </span>Incorrect answers: {incorrectAnswers}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}