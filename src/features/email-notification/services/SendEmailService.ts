import { handleResponse } from "@/shared/api/handleResponse";

interface SendEmailProps {
    email: FormDataEntryValue | null;
    text: FormDataEntryValue | null;
    shouldSendPdf: FormDataEntryValue | null,
    name: string;
    testName: string;
    source: string;
    html: string;
}

export class SendEmailService {

    static async sendEmail(emailData: SendEmailProps) {

        const response = await fetch('/completed/send-notification-email', {
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