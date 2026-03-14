import { handleResponse } from "@/shared/api/handleResponse";

interface SendEmailProps {
    name: string;
    who: string | null;
    ux: string | null,
    speed: string | null;
    rate: string;
    text: string;
    source: string;
}

export class SendFeedbackEmailService {

    static async sendEmail(emailData: SendEmailProps) {

        const response = await fetch('/user/user-feedback', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(emailData)
        });

        const res = await handleResponse<{ success: boolean }>(response, 'Failed to send email');

        if (!res) {
            throw new Error('Empty response from server')
        }
        return res;
    }
}