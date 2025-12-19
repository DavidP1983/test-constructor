import { baseRow } from "@/entities/table/ui/table-row/baseRow";
import { TableCompletedActions } from "@/features/table-actions/ui/TableCompletedActions";
import { AllTests } from "@/shared/types/test-type";


export const renderRowCompleted = (i: number, item: AllTests, status?: string) => {
    return (
        <>
            {baseRow(i, item, status)}
            <td data-icon="Icon">
                <TableCompletedActions />
            </td>
        </>
    )
}