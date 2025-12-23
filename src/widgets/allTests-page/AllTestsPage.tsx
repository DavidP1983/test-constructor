import ErrorBoundary from "@/shared/ui/errorBoundary/ErrorBoundary";
import { Spinner } from "@/shared/ui/spinner/Spinner";
import { Suspense } from "react";
import { AllTestsPageClient } from "./AllTestsPageClient";


export const AllTestsPage = async () => {

    return (
        <ErrorBoundary>
            <Suspense fallback={<Spinner isFallback={true} />}>
                <AllTestsPageClient />
            </Suspense>
        </ErrorBoundary>
    )
}
