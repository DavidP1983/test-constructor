import { Spinner } from "@/shared/ui/spinner/Spinner";
import { CreateTestPage } from "@/widgets/create-test/ui/CreateTestPage";
import { Metadata } from "next";
import { Suspense } from 'react';

export const metadata: Metadata = {
    title: "Create Test Page",
    description: "Create new test page",
};


export default function CreateNewTest() {
    return (
        <Suspense fallback={<Spinner isFallback={true} />}>
            <CreateTestPage />
        </Suspense>
    )
}
