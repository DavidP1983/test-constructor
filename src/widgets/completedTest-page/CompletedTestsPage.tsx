import ErrorBoundary from "@/shared/ui/errorBoundary/ErrorBoundary";
import { CompletedTestsPageClient } from "./CompletedTestsPageClient";


export const CompletedTestsPage = async () => {

    return (
        <ErrorBoundary>
            <CompletedTestsPageClient />
        </ErrorBoundary>
    )

}