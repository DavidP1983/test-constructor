
export interface TableProps<T> {
    dataRow: T[];
    dataHeader: string[];
    renderHeader: (data: string[]) => React.ReactNode;
    renderRow: (id: number, data: T, status?: string) => React.ReactNode;
    status?: string;
}