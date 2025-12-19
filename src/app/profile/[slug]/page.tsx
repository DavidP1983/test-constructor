import { api } from "@/entities/test-operation/api/apiService";
import { AllTests } from "@/shared/types/test-type";
import { TetsEditorPage } from "@/widgets/testEditor-page/TestEditorPaga";
import { Metadata } from "next";

type Params = Promise<{ slug: string }>

export async function generateStaticParams() {
    const tests: AllTests[] = await api.get('tests');
    return tests.map(item => ({
        slug: item.id.toString()
    }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const { slug } = await params;
    const test: AllTests = await api.getById(`tests/${slug}`);
    return {
        title: test?.name,
        description: `${test?.name} page`,
    }
}


export default async function TestEditorPage({ params }: { params: Params }) {
    const { slug } = await params;
    const singleTest = await api.getById(`tests/${slug}`);
    return (
        <TetsEditorPage singleTest={singleTest} />
    )
}