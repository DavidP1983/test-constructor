/**
 * Generic UI component for rendering content based on request status.
 *
 * Handles common states:
 * - loading → spinner
 * - error → error page
 * - empty data → custom empty state
 * - success → custom data rendering
 *
 * Uses render props to remain data-agnostic.
 */

import { ErrorPage } from "../error/ErrorPage";
import { Spinner } from "../spinner/Spinner";


interface Props<T> {
    loading: boolean;
    status: 'pending' | 'error' | 'success';
    data: T[];
    completed?: string;
    renderEmpty: () => React.ReactNode;
    renderData: (data: T[], completed?: string) => React.ReactNode;
}


export const StatusContent = <T,>({ loading, data, status, completed, renderEmpty, renderData }: Props<T>) => {
    if (loading) return <Spinner />
    if (status === 'error') return <ErrorPage error="Opps... something went wrong" />
    if (!data.length) return renderEmpty()
    return renderData(data, completed)

}