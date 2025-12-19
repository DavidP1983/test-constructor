import { baseRow } from "@/entities/table/ui/table-row/baseRow";
import { TableActions } from "@/features/table-actions/ui/TableActions";
import { AllTests } from "@/shared/types/test-type";
import styles from '@/styles/blocks/table.module.scss';


export const renderRow = (i: number, item: AllTests) => {
    return (
        <>
            {baseRow(i, item)}
            <td data-icon="Icon">
                <div className={styles.table__icons}>
                    <TableActions testId={item.id} />
                </div>
            </td>
        </>
    )
}