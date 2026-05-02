import { FlashDeck } from '@/widgets/flash-deck';
import Header from '@/widgets/header/ui/Header';
import { Metadata } from 'next';


export const metadata: Metadata = {
    title: "Flash Card",
    description: "Flash Card page",
};


export default function FlashFolderPage() {

    return (
        <>
            <Header />
            <main>
                <FlashDeck />
            </main>
        </>
    )
}