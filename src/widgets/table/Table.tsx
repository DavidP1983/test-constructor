import { TableProps } from '@/shared/types/table-type';

export default function Table<T extends { _id?: string }>
    ({
        dataRow,
        dataHeader,
        renderHeader,
        renderRow,
        token,
        virtualizer,
    }: Readonly<TableProps<T>>) {

    return (
        <table data-testid="table">
            <thead>
                <tr>
                    {renderHeader(dataHeader)}
                </tr>
            </thead>
            <tbody style={{
                position: "relative",
                height: `${virtualizer?.getTotalSize() ?? 0}px`,
            }}>
                {virtualizer?.getVirtualItems().map((virtualRow) => {
                    const row = dataRow[virtualRow.index]
                    return (
                        <tr key={virtualRow.key}
                            style={{
                                position: 'absolute',
                                display: 'inline-table',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: `${virtualRow.size}px`,
                                transform: `translateY(${virtualRow.start}px)`
                            }}
                        >
                            {renderRow(virtualRow.index, row, token)}
                        </tr>
                    )
                })}

            </tbody>
        </table>
    )
}