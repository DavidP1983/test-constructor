import ErrorBoundary from "@/shared/ui/errorBoundary/ErrorBoundary";
import { AllTestsPageClient } from "./AllTestsPageClient";


export const AllTestsPage = async () => {

    return (
        <ErrorBoundary>
            <AllTestsPageClient />
        </ErrorBoundary>
    )
}
