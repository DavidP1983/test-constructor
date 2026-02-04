import { completedTestRow } from "@/entities/table/ui/table-row/completedTestRow";
import { TableCompletedActions } from "@/features/table-actions/ui/TableCompletedActions";
import { CompletedTest } from "@/shared/types/completed-type";


export const renderRowCompleted = (i: number, item: CompletedTest, token: string[] | undefined) => {

    const isNew = token?.includes(item.accessToken)

    return (
        <>
            {completedTestRow<CompletedTest>(i, item, isNew)}
            <td data-icon="Icon">
                <TableCompletedActions testId={item._id} />
            </td>
        </>
    )
}