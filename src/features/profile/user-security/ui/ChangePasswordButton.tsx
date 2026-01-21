import { SpinnerForBtn } from '@/shared/ui/spinner/SpinnerForBtn';
import { notify } from '@/shared/utils/notify';
import { useState } from 'react';
import { formFields } from '../lib/formFields';
import { notifyForm } from '../lib/notifyForm';
import { UserService } from '../services/UserService';

import styles from '@/styles/blocks/profile.module.scss';


export const ChangePasswordButton = () => {
    const [isDisable, setIsDisable] = useState(false);


    const handleForm = async () => {
        try {
            const { confirm, data } = await notifyForm(formFields, "change");
            setIsDisable(confirm);
            if (data?.password && data.newPassword) {
                await UserService.changePassword(data.password, data.newPassword);
                notify('success', "Password was changed successfully")
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
            className={styles.profile__security_btn}
            onClick={handleForm}
            disabled={isDisable}>Change password {isDisable && <SpinnerForBtn />}</button>
    )
}