import { AuthStep } from "../model/store";

import styles from '@/styles/blocks/verification.module.scss';

export const AUTH_STATUS_CLASS: Partial<Record<AuthStep, string>> = {
    verification: styles.verification__status_waiting,
    loadingVerification: styles.verification__status_verify,
    authenticated: styles.verification__status_confirmed,
    error: styles.verification__status_error,
    limit: styles.verification__status_error,
    resendError: styles.verification__status_error,
};