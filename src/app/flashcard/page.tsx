import { FlashDesk } from '@/widgets/flash/ui/flash-deck/FlashDesk';
import { FlashFolders } from '@/widgets/flash/ui/flash-folders/FlashFolders';
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
                <FlashDesk>
                    <FlashFolders />
                </FlashDesk>
            </main>
        </>
    )
}