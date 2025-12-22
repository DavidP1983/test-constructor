
import { AllTestsPage } from '@/widgets/allTests-page/AllTestsPage';
import Header from '@/widgets/header/ui/Header';
import { Metadata } from 'next';


export const metadata: Metadata = {
    title: "List of all tests",
    description: "Profile's tests",
};

export default function Builder() {

    return (
        <>
            <Header />
            <AllTestsPage />
        </>
    )
}