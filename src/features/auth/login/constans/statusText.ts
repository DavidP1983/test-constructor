import { AuthStep } from "../model/store";

export const AUTH_STATUS_TEXT: Partial<Record<AuthStep, (time?: string | null) => string>> = {
    verification: () => 'Awaiting Input...',
    loadingVerification: () => 'Verifying...',
    authenticated: () => 'Access Granted',
    error: () => 'LOCKED',
    limit: (time) => `Too many attempts. Request a new code after (${time ?? ''})`,
    resendError: () => 'Please wait before requesting a new code.',
};