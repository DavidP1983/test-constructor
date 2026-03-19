'use client'
import { ErrorPage } from "@/shared/ui/error/ErrorPage"

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <ErrorPage
            error={`Opps... something went wrong, ${error.message}`}
            actions={<button onClick={() => reset()}>Try again</button>} />
    )
}