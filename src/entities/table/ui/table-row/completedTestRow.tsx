import { CompletedTest } from "@/shared/types/completed-type";
import { formatDate } from "../../model/formatDate";

export const completedTestRow = <T extends CompletedTest>(i: number, item: T, isNew: boolean | undefined) => {
    return (
        <>
            <td data-label="ID">
                {i + 1}. {item.testName}
                {isNew && <span>NEW</span>}
            </td>
            <td data-label="Data">{formatDate(item?.completedAt)}</td>
            <td data-label="Qnt">{item.correctAnswers + "/" + item.totalQuestions}</td>
            <td data-label="Candidate">{item.candidateName}</td>
            <td data-label="Status">{item.status}</td>
        </>

    )
}
