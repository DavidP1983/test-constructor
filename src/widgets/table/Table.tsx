import { TableProps } from '@/shared/types/table-type';

export default function Table<T extends { _id?: string }>({ dataRow, dataHeader, renderHeader, renderRow, token }: Readonly<TableProps<T>>) {
    return (
        <table data-testid="table">
            <thead>
                <tr>
                    {renderHeader(dataHeader)}
                </tr>
            </thead>
            <tbody>
                {dataRow.map((elem, i) => (
                    renderRow(i, elem, token)
                ))}
            </tbody>
        </table>
    )
}