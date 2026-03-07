import { CompletedTest } from "@/shared/types/completed-type";
import clsx from "clsx";
import { formatDate } from "../../model/formatDate";

import styles from '@/styles/blocks/table.module.scss';

export const completedTestRow = <T extends CompletedTest>(i: number, item: T, isNew: boolean | undefined) => {

    const classNames = clsx({
        [styles.passed]: item.status === 'passed',
        [styles.failed]: item.status === 'failed'
    })

    return (
        <>
            <td data-label="ID">
                {i + 1}. {item.testName}
                {isNew && <span role='status' className={styles.new}>NEW</span>}
            </td>
            <td data-label="Data">{formatDate(item?.completedAt)}</td>
            <td data-label="Qnt">{item.correctAnswers + "/" + item.totalQuestions}</td>
            <td data-label="Candidate">{item.candidateName}</td>
            <td data-label="Status" className={classNames}>{item.status}</td>
        </>

    )
}
