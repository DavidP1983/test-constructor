import { SpinnerForBtn } from '@/shared/ui/spinner/SpinnerForBtn';
import { notify } from '@/shared/utils/notify';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { formFields } from '../lib/formFields';
import { notifyForm } from '../lib/notifyForm';
import { UserService } from '../services/UserService';


import { useLoginForm } from '@/features/auth/login/model/store';
import styles from '@/styles/blocks/profile.module.scss';


export const DeleteAccountButton = () => {
    const [isDisable, setIsDisable] = useState(false);
    const reset = useLoginForm(state => state.reset);
    const router = useRouter();

    const fields = formFields.slice(0, 1);

    const handleDeleteAccount = async () => {
        try {
            const { data, confirm } = await notifyForm(fields, "delete");
            setIsDisable(confirm);
            if (data?.email) {
                await UserService.deleteAccount(data.email);
                await notify('success', "Account was deleted")
                router.push('/');
                reset();
            }
        } catch (e) {
            if (e instanceof Error) {
                const errorMessage = e.message;
                notify('error', errorMessage)
            }
        } finally {
            setIsDisable(false);
        }
    }

    return (
        <button
            className={styles.profile__security_btn + " " + styles.delete}
            onClick={handleDeleteAccount}
            disabled={isDisable}>
            Delete account {isDisable && <SpinnerForBtn />}</button>
    )
}