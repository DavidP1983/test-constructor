/* eslint-disable react-hooks/set-state-in-effect */
'use client';
import { SpinnerForBtn } from '@/shared/ui/spinner/SpinnerForBtn';
import clsx from 'clsx';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { useLogin } from '../model/useLogin';

import styles from '@/styles/blocks/form.module.scss';

export const LoginForm = () => {
    const [mounted, setMounted] = useState(false);
    const {
        handleToggle,
        handleFieldValue,
        handleRegistration,
        handleLogin,
        type,
        fieldValue,
        fieldErrors,
        authStep,
        errorMessage
    } = useLogin();

    // To avoid hydration mismatch
    useEffect(() => setMounted(true), [])

    if (!mounted) return null;

    return (

        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5, ease: 'linear' }}
            className={styles.auth__form}>
            <form className={styles.form} onSubmit={handleRegistration} aria-label="Registration Form">
                <fieldset>
                    <div className={styles.form__field}>
                        <input
                            inputMode="text"
                            value={fieldValue.name}
                            name="name"
                            id="name"
                            data-attr="name"
                            placeholder=" "
                            autoComplete="on"
                            required
                            onChange={handleFieldValue} />
                        <label htmlFor="name">Name</label>
                        <div className={clsx(styles.form__errorFields, fieldErrors.name && styles.active)}>{fieldErrors.name}</div>
                    </div>
                    <div className={styles.form__field}>
                        <input
                            inputMode="email"
                            value={fieldValue.email}
                            name="email"
                            id="email"
                            data-attr="email"
                            placeholder=" "
                            autoComplete="on"
                            required
                            onChange={handleFieldValue} />
                        <label htmlFor="email">Email</label>
                        <div className={clsx(styles.form__errorFields, fieldErrors.email && styles.active)}>{fieldErrors.email}</div>
                    </div>

                    <div className={styles.form__field}>
                        <input
                            type={type}
                            value={fieldValue.password}
                            name="password"
                            id="password"
                            data-attr="password"
                            placeholder=" "
                            required
                            onChange={handleFieldValue} />
                        <label htmlFor="password">Password</label>
                        <div className={clsx(styles.form__errorFields, fieldErrors.password && styles.active)}>{fieldErrors.password}</div>
                        <button
                            className={styles.eye}
                            type="button"
                            onClick={handleToggle}>
                            <i className={type === 'password' ? "icon-eye" : 'icon-eye-off'}></i>
                        </button>
                    </div>
                </fieldset>
                <div className={clsx(styles.form__error, errorMessage && styles.active)}>{errorMessage ?? ''}</div>
                <button
                    type="submit"
                    className={styles.form__registration}
                    disabled={authStep === 'loadingReg' || authStep === 'loadingLog'}>
                    Registration {authStep === 'loadingReg' && <SpinnerForBtn />}
                </button>
            </form>
            <div className={styles.form__alternative}>or</div>
            <button
                className={styles.form__login}
                disabled={authStep === 'loadingReg' || authStep === 'loadingLog'}
                onClick={handleLogin}>
                Login {authStep === 'loadingLog' && <SpinnerForBtn />}
            </button>
        </motion.div>
    )
}