import { AllTests } from "@/shared/types/test-type";
import { TestPassPage } from "@/widgets/test-pass/ui/TestPassPage";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Params = Promise<{ slug: string }>
interface PassType {
    linkId: string;
    test: AllTests;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    try {
        const { slug } = await params;
        const response = await fetch(`${process.env.API_URL}/link/get-test/${slug}`);
        if (!response.ok) {
            throw new Error('Fetch failed');
        }
        const { test } = (await response.json()) as PassType;
        return {
            title: test?.name ?? 'Not Found',
            description: `${test?.name || 'Not Found'} page`
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

    try {
        const response = await fetch(`${process.env.API_URL}/link/get-test/${slug}`);
        if (!response.ok) {
            console.log("SLUG", response.status)
            if (response.status === 410) notFound();
            throw new Error('Fetch failed');
        }

        const data = (await response.json()) as PassType;

        if (!data?.test) {
            notFound();
        }

        return <TestPassPage data={data?.test} linkId={data?.linkId} />

    } catch (e) {
        throw e;
    }

}