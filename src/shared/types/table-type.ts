import { Virtualizer } from "@tanstack/react-virtual";

export interface TableProps<T> {
    dataRow: T[];
    dataHeader: string[];
    renderHeader: (data: string[]) => React.ReactNode;
    renderRow: (id: number, data: T, token?: string[]) => React.ReactNode;
    token?: string[];
    virtualizer?: Virtualizer<HTMLDivElement, HTMLTableRowElement>;
}
