import { AllTests } from "@/shared/types/test-type";
import Link from "next/link";

export const baseRow = (i: number, { id, createdAt, participantsCount, name, result }: AllTests, status?: string) => {

    const formatDate = (date: string | null): string => {
        if (!date) return '';

        const [yy, dd, mm] = date.split('-');
        return `${dd}.${mm}.${yy}`;
    }

    return (
        <>

            <td data-label="ID"><Link href={`builder/${id}?mode=preview`}>{i + 1}. {name}</Link></td>
            <td data-label="Data">{formatDate(createdAt)}</td>
            <td data-label="Qnt">
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