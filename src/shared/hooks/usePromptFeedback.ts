import { useLoginForm } from "@/features/auth/login/model/store";
import { useRouter } from "next/navigation";
import { notifyDuringOperation } from "../utils/notifyDuringOperation";

export const usePromptFeedback = () => {
    const router = useRouter();
    const userData = useLoginForm(state => state.userData);


    const promptFeedback = async (): Promise<boolean> => {

        const shownRef =
            typeof window !== undefined && sessionStorage.getItem('feedbackPrompt');


        if (userData?.feedbackSubmitted || shownRef) return false;

        const response = await notifyDuringOperation({
            title: 'Share Your Feedback',
            text: 'I would really appreciate your feedback.Please take a moment to fill out the form — your opinion helps me improve the product and make it better for everyone.',
            icon: 'info',
            btnText: 'ok'
        });

        if (typeof window !== undefined) sessionStorage.setItem('feedbackPrompt', 'true');


        if (response.isConfirmed) {
            router.push('/feedback');
            return true;
        }
        return false;
    }
    return { promptFeedback };
}