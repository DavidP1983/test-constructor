import { draftTestRow } from "@/entities/table/ui/table-row/draftTestRow";
import { TableActions } from "@/features/table-actions/ui/TableActions";
import { AllTests } from "@/shared/types/test-type";
import styles from '@/styles/blocks/table.module.scss';


export const renderRow = (i: number, item: AllTests) => {
    return (
        <>
            {draftTestRow<AllTests>(i, item)}
            <td data-icon="Icon">
                <div className={styles.table__icons}>
                    <TableActions testId={item.id} />
                </div>
            </td>
        </>
    )
}