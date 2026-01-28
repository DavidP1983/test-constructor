import { CompletedTest } from "@/shared/types/completed-type";
import { AllTests } from "@/shared/types/test-type";
import { TestPassResult } from "@/widgets/test-result/ui/TestPassResult";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Params = Promise<{ slug: string }>
export interface CompletedResultTestType {
    originTest: AllTests;
    completedTest: CompletedTest;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    try {
        const { slug } = await params;
        const response = await fetch(`${process.env.API_URL}/completed/get-completed-result-test/${slug}`);
        if (!response.ok) {
            throw new Error('Fetch failed');
        }
        const { completedTest } = (await response.json()) as CompletedResultTestType;
        return {
            title: completedTest?.testName ?? 'Not Found',
            description: `${completedTest?.testName || 'Not Found'} page`
        }
    } catch {
        return {
            title: 'Not Found',
            description: 'Not Found'
        }
    }
}

export default async function PassTestPage({ params }: { params: Params }) {
    const { slug } = await params;

    const response = await fetch(`${process.env.API_URL}/completed/get-completed-result-test/${slug}`);

    if (response.status === 404) {
        notFound()
    }
    const { completedTest, originTest } = (await response.json()) as CompletedResultTestType;

    return <TestPassResult originTest={originTest} completedTest={completedTest} />
}

