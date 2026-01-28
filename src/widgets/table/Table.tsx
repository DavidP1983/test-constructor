import { TableProps } from '@/shared/types/table-type';

export default function Table<T extends { _id?: string }>({ dataRow, dataHeader, renderHeader, renderRow, token }: Readonly<TableProps<T>>) {
    return (
        <table>
            <thead>
                <tr>
                    {renderHeader(dataHeader)}
                </tr>
            </thead>
            <tbody>
                {dataRow.map((elem, i) => (
                    <tr key={elem._id}>{renderRow(i, elem, token)}</tr>
                ))}
            </tbody>
        </table>
    )
}