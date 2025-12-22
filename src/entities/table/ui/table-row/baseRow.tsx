import { AllTests } from "@/shared/types/test-type";
import Link from "next/link";

export const baseRow = (i: number, { id, date, participantsCount, name, result }: AllTests, status?: string) => {
    return (
        <>

            <td data-label="ID"><Link href={`builder/${id}?mode=preview`}>{i + 1}. {name}</Link></td>
            <td data-label="Data">{date}</td>
            <td data-qnt="Qnt">
                {
                    status === 'completed'
                        ? result?.answers + "/" + result?.totalQuestions
                        :
                        participantsCount
                }
            </td>

        </>

    )
} 