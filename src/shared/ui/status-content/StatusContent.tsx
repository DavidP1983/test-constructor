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

import dynamic from "next/dynamic";
interface Props<T> {
    data: T[];
    status: "loading" | "error" | "success";
    completed?: string;
    renderEmpty: () => React.ReactNode;
    renderData: (data: T[], completed?: string) => React.ReactNode;
}

const ErrorPage = dynamic(
    () => import('../error/ErrorPage').then(m => m.ErrorPage), { ssr: false }
);
const Spinner = dynamic(
    () => import('../spinner/Spinner').then(m => m.Spinner), { ssr: false }
)

export const StatusContent = <T,>(
    {
        data,
        status,
        completed,
        renderEmpty,
        renderData }: Props<T>) => {

    if (status === 'loading') return <Spinner />
    if (status === 'error') return <ErrorPage error="Opps... something went wrong, please reload the page" />
    if (!data.length) return renderEmpty();

    return renderData(data, completed)
}