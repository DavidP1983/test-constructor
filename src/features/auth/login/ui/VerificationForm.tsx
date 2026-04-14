'use client';

import { SpinnerForBtn } from '@/shared/ui/spinner/SpinnerForBtn';
import { notify } from '@/shared/utils/notify';
import clsx from 'clsx';
import { motion } from 'motion/react';
import { useEffect } from 'react';
import { KEYPAD_VALUES } from '../constans/keypad';
import { AUTH_STATUS_CLASS } from '../constans/statusStyles';
import { AUTH_STATUS_TEXT } from '../constans/statusText';
import { useVerification } from '../model/useVerification';
import { formatTime } from '../utils/formatTime';

import styles from '@/styles/blocks/verification.module.scss';


export const VerificationForm = () => {

    const {
        authStep,
        tryLimit,
        resendCode,
        timeLeft,
        handleVerifyCode,
        code,
        myRefFocus,
    } = useVerification();

    const text = AUTH_STATUS_TEXT[authStep]?.(formatTime(timeLeft));
    const className = AUTH_STATUS_CLASS[authStep];


    useEffect(() => {
        notify('info', 'An email with a verification code has been sent to your email address.')
    }, []);


    const classNames = clsx({
        [styles.icon]: true,
        'icon-lock': authStep !== 'authenticated',
        'icon-ok': authStep === 'authenticated',
        [styles.confirmed]: authStep === 'authenticated',
    });


    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5, ease: 'linear' }}
            className={clsx(styles.verification, authStep === 'error' && styles.shake)}>
            <div className={styles.verification__access}>
                <div className={classNames}></div>
                <h2 className={styles.title}>Restricted Access</h2>
            </div>

            <div className={styles.verification__dots}>
                {Array.from({ length: 4 }, (_, i) => (
                    <div
                        className={clsx(
                            styles.dot,
                            i < code.length && styles.enter,
                            authStep === 'error' && styles.error,
                            authStep === 'authenticated' && styles.success
                        )}
                        key={i}>
                    </div>
                ))}
            </div>

            <div className={styles.verification__btns}>
                {KEYPAD_VALUES.map((item, i) => {
                    if (item === 'clear') {
                        return (
                            <button
                                className={clsx('icon-cancel-alt', styles.btn)}
                                key={item}
                                data-attr={item}
                                aria-label='clear'
                                onClick={handleVerifyCode}
                                tabIndex={0}
                                ref={(el) => { myRefFocus.current[i] = el }}
                                disabled={tryLimit === 4}>
                            </button>
                        )
                    }
                    if (item === 'go') {
                        return (
                            <button
                                className={clsx(styles.btn, styles.go)}
                                key={item}
                                data-attr={item}
                                onClick={handleVerifyCode}
                                tabIndex={0}
                                ref={(el) => { myRefFocus.current[i] = el }}
                                disabled={tryLimit === 4}>
                                GO
                            </button>
                        )
                    }
                    return (
                        <button
                            className={clsx(styles.btn)}
                            key={item}
                            data-attr={item}
                            onClick={handleVerifyCode}
                            tabIndex={0}
                            ref={(el) => { myRefFocus.current[i] = el }}
                            disabled={tryLimit === 4}>
                            {item}
                        </button>
                    )
                })}
            </div>
            <div className={styles.verification__status}>
                <div className={className}>
                    {authStep === 'loadingVerification' && <SpinnerForBtn />}
                    {text}
                </div>
                {tryLimit === 4 && timeLeft === 0 && timeLeft !== null
                    ? <button
                        className={clsx(styles.verification__status_resend)}
                        onClick={resendCode}
                        disabled={authStep === 'resendLogin'}>
                        {authStep === 'resendLogin' ? (<><SpinnerForBtn /> Resending...</>) : 'Resend Code'}
                    </button>
                    : null
                }
            </div>
        </motion.div>
    )
}
