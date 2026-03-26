import NotFound from "@/app/not-found";
import { GeneralFlashType } from "@/entities/flash/types/flashTypes";
import { api } from "@/entities/test-operation/api/apiService";
import { Spinner } from "@/shared/ui/spinner/Spinner";
import { FlashCard } from "@/widgets/flash/ui/flash-card/FlashCard";
import { Metadata } from "next";
import { Suspense } from "react";

type Params = Promise<{ slug: string }>


export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    try {
        const { slug } = await params;
        const folder = await api.get<GeneralFlashType>(`/flashcards/get-folder/${slug}`);
        return {
            title: folder?.title ?? 'Not Found page',
            description: folder?.description || 'Not Found'
        }

    } catch {
        return {
            title: 'Not Found page',
            description: 'Not Found'
        }
    }
}

export default async function FlashCardsEditorPage(
    { params, searchParams }: { params: Params, searchParams: Promise<{ [key: string]: string }> }) {
    const { slug } = await params;
    const queryParams = await searchParams;
    const mode = queryParams.mode === 'create' ? 'create' : 'edit'

    const folderData = await api.get<GeneralFlashType>(`/flashcards/get-folder/${slug}`);

    if (!folderData) {
        return <NotFound />
    }

    return (
        <Suspense fallback={<Spinner isFallback={true} />}>
            <main>
                <FlashCard folderData={folderData} mode={mode} />
            </main>
        </Suspense>
    )
}

