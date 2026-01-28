import { AllTests } from "@/shared/types/test-type";
import Link from "next/link";
import { formatDate } from "../../model/formatDate";

export const draftTestRow = <T extends AllTests>(i: number, item: T) => {

    return (
        <>

            <td data-label="ID"><Link href={`builder/${item.id}?mode=preview`}>{i + 1}. {item.name}</Link></td>
            <td data-label="Data">{formatDate(item.createdAt)}</td>
            <td data-label="Qnt">{item.participantsCount}</td>
            <td data-label="Creator">{item.creator}</td>
        </>

    )
}
