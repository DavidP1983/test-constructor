'use client'
import { ErrorPage } from "@/shared/ui/error/ErrorPage"

export default function Error({
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <ErrorPage
            error={`Opps... something went wrong, we are sorry for inconvenience, let us know about this error`}
            actions={<button onClick={() => reset()}>Try again</button>} />
    )
}