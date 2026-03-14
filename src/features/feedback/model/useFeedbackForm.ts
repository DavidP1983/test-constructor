import { SpeedSelect, UseSelect, WhoSelect } from "@/shared/types/select.types";
import { notify } from "@/shared/utils/notify";
import { useState } from "react";
import { SendFeedbackEmailService } from "../services/SendFeedbackEmailService";
import { SelectType } from "../types/feedback-types";


export const useFeedbackForm = () => {
    const [fieldsValue, setFieldsValue] = useState<{ name: string, rate: string, textarea: string }>({
        name: '',
        rate: '',
        textarea: ''
    });
    const [selectValueFields, setSelectValueFields] = useState<{ who: WhoSelect | null, ux: UseSelect | null, speed: SpeedSelect | null }>({
        who: null,
        ux: null,
        speed: null
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');


    /* Сбор данных полей input*/
    const handleInputData = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setError('');
        setFieldsValue(prev => (
            {
                ...prev, [name]: e.target.type !== 'radio'
                    ? value : (e.target as HTMLInputElement).value
            }
        ));
    }


    /* Сбор данных полей select*/
    const handleSelectFieldsData = (name: SelectType, value: string) => {
        setError('');
        setSelectValueFields(prev => ({ ...prev, [name]: value }));
    }

    /* Отправка формы */
    const handleSubmitForm = async (e: React.FormEvent) => {
        e.preventDefault();

        const hasEmptyField = Object.values(fieldsValue).some(v => !v);
        const hasEmptySelect = Object.values(selectValueFields).some(v => !v);

        if (hasEmptyField || hasEmptySelect) {
            setError('Please, fill out all fields');
            return;
        }

        const payload = {
            name: fieldsValue.name,
            who: selectValueFields.who,
            ux: selectValueFields.ux,
            speed: selectValueFields.speed,
            rate: fieldsValue.rate,
            text: fieldsValue.textarea,
            source: 'feedback'
        }

        try {
            setLoading(true);
            const result = await SendFeedbackEmailService.sendEmail(payload);

            if (result.success) {
                notify('success', 'Email was sent successfully!');
            }
            setFieldsValue({ name: '', rate: '', textarea: '' });
            setSelectValueFields({ who: null, ux: null, speed: null });

        } catch {
            notify('error', 'An error occurred while sending the email. Please try again.')
        } finally {
            setLoading(false);
        }
    }

    return {
        handleInputData,
        handleSelectFieldsData,
        handleSubmitForm,
        fieldsValue,
        selectValueFields,
        loading,
        error
    }
}