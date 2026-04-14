import { notify } from "@/shared/utils/notify";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";
import { schema } from "./schema";
import { useLoginForm } from "./store";


export const useLogin = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [type, setType] = useState<string>('password');
    const [fieldValue, setFieldValue] = useState({ name: '', email: '', password: '' })
    const [fieldErrors, setFieldErrors] = useState({ name: '', email: '', password: '' })
    const { registration, login, errorMessage, clearErrorMessage, authStep } = useLoginForm(useShallow((state) => ({
        registration: state.registration,
        login: state.login,
        errorMessage: state.errorMessage,
        clearErrorMessage: state.clearErrorMessage,
        authStep: state.authStep
    })));

    useEffect(() => {
        if (searchParams.get('auth') === 'required' && authStep !== 'authenticated') {
            notify("error", 'Need to be Authorize')
        }
    }, [searchParams, authStep]);


    const handleToggle = () => {
        setType(type === 'password' ? "text" : 'password');
    }

    const handleFieldValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const key = e.target.dataset.attr;
        setFieldValue({ ...fieldValue, [key as keyof typeof fieldValue]: value });
        setFieldErrors({ ...fieldErrors, [key as keyof typeof fieldValue]: '' });
        clearErrorMessage();
    }

    // Registration
    const handleRegistration = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const res = {
            name: String(formData.get('name')),
            email: String(formData.get('email')),
            password: String(formData.get('password')),
        }

        const formDataValidation = await schema.safeParseAsync(res);
        if (!formDataValidation.success) {
            const errors: Record<"name" | "email" | "password", string> = { name: '', email: '', password: '' }
            formDataValidation.error.issues.forEach(err => {
                const field = err.path[0];
                if (field) {
                    errors[field as keyof typeof fieldErrors] = err.message
                }
                setFieldErrors(errors);
            });
        } else {
            const success = await registration(formDataValidation.data);
            if (success) {
                router.push('/builder');
                setFieldValue({ name: '', email: '', password: '' });
            }
        }

    }

    // Login
    const handleLogin = async () => {

        const formDataValidation = await schema.safeParseAsync(fieldValue);
        if (!formDataValidation.success) {
            const errors: Record<"name" | "email" | "password", string> = { name: '', email: '', password: '' }
            formDataValidation.error.issues.forEach(err => {
                const field = err.path[0];
                if (field) {
                    errors[field as keyof typeof fieldErrors] = err.message
                }
                setFieldErrors(errors)
            });
        } else {
            await login(formDataValidation.data);
            setFieldValue({ name: '', email: '', password: '' });
        }
    }

    return {
        handleToggle,
        handleFieldValue,
        handleRegistration,
        handleLogin,
        type,
        fieldValue,
        fieldErrors,
        authStep,
        errorMessage
    }

}