'use client';
import { useLoginForm } from "../model/store";
import { LoginForm } from "./LoginForm";
import { VerificationForm } from "./VerificationForm";


export const AuthContainer = () => {
    const isAuth = useLoginForm(state => state.isAuth)

    if (isAuth) {
        return <VerificationForm />;
    }
    return <LoginForm />
}