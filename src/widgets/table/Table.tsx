import { TableProps } from '@/shared/types/table-type';
import { AllTests } from '@/shared/types/test-type';

export default function Table({ dataRow, dataHeader, renderHeader, renderRow, status }: Readonly<TableProps<AllTests>>) {
    return (
        <table>
            <thead>
                <tr>
                    {renderHeader(dataHeader)}
                </tr>
            </thead>
            <tbody>
                {dataRow.map((elem, i) => (
                    <tr key={elem.id}>{renderRow(i, elem, status)}</tr>
                ))}
            </tbody>
        </table>
    )
}