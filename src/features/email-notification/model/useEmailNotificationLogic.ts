import { CompletedTest } from "@/shared/types/completed-type";
import { notify } from "@/shared/utils/notify";
import { useEffect, useRef, useState } from "react";
import { createPdfTemplate } from "../lib/createPdfTemplate";
import { SendEmailService } from "../services/SendEmailService";
import { getDefaultTextarea } from "./getDefaultTextarea";


export const useEmailNotificationLogic = (completedTest: CompletedTest) => {

    const
        {
            candidateName,
            candidateEmail,
            testName,
            status
        } = completedTest ?? {}

    const html = createPdfTemplate(completedTest);

    //  Lazy initialization
    const [fieldsValue, setFieldsValue] = useState<{ email: string, textarea: string, isChecked: boolean }>(() => ({
        email: candidateEmail ?? '',
        textarea: getDefaultTextarea(testName, status),
        isChecked: false
    }));
    const [errorMessage, setErrorMessage] = useState({ message: '' });
    const [fetchStatus, setFetchStatus] = useState<'idle' | 'loading' | 'success'>('idle')
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);



    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current)
            }
        }
    }, []);

    const handleInputData = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setErrorMessage({ message: '' });
        setFieldsValue(prev => (
            {
                ...prev, [name]: e.target.type !== 'checkbox'
                    ? value.trim() : (e.target as HTMLInputElement).checked
            }));
    }

    const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const emailData = {
            email: formData.get('email'),
            text: formData.get('textarea'),
            shouldSendPdf: formData.get('isChecked'),
            name: candidateName ?? '',
            testName: testName ?? '',
            source: 'client',
            html
        }

        if (!emailData.email || !emailData.text) {
            setErrorMessage({ message: 'All fields must be filled.' });
            return;
        }

        setFetchStatus('loading');

        try {
            await SendEmailService.sendEmail(emailData);
            setFetchStatus('success');
        } catch (e) {
            if (e instanceof Error) {
                notify('error', e.message ?? 'Failed to Send Email')
            }
        } finally {
            timerRef.current = setTimeout(() => {
                setFetchStatus('idle');
                setFieldsValue({ email: '', textarea: '', isChecked: false })
            }, 1000);
        }
    }

    return {
        fieldsValue,
        errorMessage,
        fetchStatus,
        handleInputData,
        handleSubmitForm
    }
}