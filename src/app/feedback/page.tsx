import { FeedbackForm } from '@/features/feedback/ui/FeedbackForm';
import Header from '@/widgets/header/ui/Header';
import { Metadata } from 'next';


export const metadata: Metadata = {
    title: "Feedback page",
    description: "Feedback form page",
};

export default function Feedback() {

    return (
        <>
            <Header />
            <FeedbackForm />
        </>
    )
}