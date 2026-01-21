import NotFound from "@/app/not-found";
import { api } from "@/entities/test-operation/api/apiService";
import { AllTests } from "@/shared/types/test-type";
import { Spinner } from "@/shared/ui/spinner/Spinner";
import { TetsEditorPage } from "@/widgets/testEditor-page/ui/TestEditorPaga";
import { Metadata } from "next";
import { Suspense } from "react";

type Params = Promise<{ slug: string }>

// Приводит к проблема на GitHub-Actions при CI
// export async function generateStaticParams() {
//     const tests = await api.get<AllTests[]>('/test/get/public') ?? [];
//     return tests.map(item => ({
//         slug: item.id.toString()
//     }));
// }

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    try {
        const { slug } = await params;
        const test = await api.get<AllTests>(`/test/get/public/${slug}`);
        return {
            title: test?.name ?? 'Not Found',
            description: `${test?.name ?? "Not Found"} page`,
        }

    } catch {
        return {
            title: 'Not Found',
            description: "Not Found page",
        }
    }
}


export default async function TestEditorPage({ params }: { params: Params }) {
    const { slug } = await params;
    const singleTest = await api.get<AllTests>(`/test/get/public/${slug}`);

    if (!singleTest) {
        return <NotFound />
    }

    return (
        <Suspense fallback={<Spinner isFallback={true} />}>
            <TetsEditorPage singleTest={singleTest} />
        </Suspense>
    )
}