import ErrorBoundary from "@/shared/ui/errorBoundary/ErrorBoundary";
import { Spinner } from "@/shared/ui/spinner/Spinner";
import { Suspense } from "react";
import { CompletedTestsPageClient } from "./CompletedTestsPageClient";


export const CompletedTestsPage = async () => {

    return (
        <ErrorBoundary>
            <Suspense fallback={<Spinner isFallback={true} />}>
                <CompletedTestsPageClient />
            </Suspense>
        </ErrorBoundary>
    )

}

