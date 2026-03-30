import NotFound from "@/app/not-found";
import { GeneralFlashType } from "@/entities/flash/types/flashTypes";
import { api } from "@/entities/test-operation/api/apiService";
import { Spinner } from "@/shared/ui/spinner/Spinner";
import { FlashCardStudy } from "@/widgets/flash/ui/flash-study/FlashCardStudy";
import { Metadata } from "next";
import { Suspense } from "react";

type Params = Promise<{ slug: string }>


export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    try {
        const { slug } = await params;
        const folder = await api.get<GeneralFlashType>(`/flashcards/study/${slug}`);
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

export default async function FlashCardsStudyPage(
    { params }: { params: Params }) {
    const { slug } = await params;

    const folderData = await api.get<GeneralFlashType>(`/flashcards/study/${slug}`);

    if (!folderData) {
        return <NotFound />
    }

    return (
        <Suspense fallback={<Spinner isFallback={true} />}>
            <main>
                <FlashCardStudy folderData={folderData} />
            </main>
        </Suspense>
    )
}

