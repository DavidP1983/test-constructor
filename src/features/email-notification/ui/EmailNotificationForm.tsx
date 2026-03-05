
import { TestPassResultProps } from '@/widgets/test-result/ui/TestPassResult';
import clsx from 'clsx';
import { useEmailNotificationLogic } from '../model/useEmailNotificationLogic';

import styles from '@/styles/blocks/emailform.module.scss';


export const EmailNotificationForm = ({ completedTest }: Omit<TestPassResultProps, "originTest">) => {
    const
        {
            fieldsValue,
            errorMessage,
            fetchStatus,
            handleInputData,
            handleSubmitForm
        } = useEmailNotificationLogic(completedTest);


    return (
        <div className={styles.form}>
            <h2 className={clsx("title", styles.form__title)}>Send Email <i className="icon-mail"></i></h2>
            <form onSubmit={handleSubmitForm}>
                <div className={styles.form__field}>
                    <label htmlFor="email">Email</label>
                    <input
                        value={fieldsValue.email}
                        onChange={handleInputData}
                        type="email"
                        id="email"
                        name="email"
                        required
                        placeholder="type candidate email..." />
                </div>
                <div className={styles.form__field}>
                    <label htmlFor="textarea">Comment</label>
                    <textarea
                        value={fieldsValue.textarea}
                        onChange={handleInputData}
                        spellCheck='true'
                        id="textarea"
                        name="textarea"
                        required
                        placeholder="type comment..." />
                </div>
                <div className={styles.form__field_check}>
                    <label htmlFor="checkbox">Send PDF file to user</label>
                    <input
                        checked={fieldsValue.isChecked}
                        type='checkbox'
                        onChange={handleInputData}
                        id="checkbox"
                        name="isChecked" />
                </div>
                <span className={styles.form__error}>{errorMessage.message}</span>
                <button
                    className={clsx(styles.form__btn, styles[fetchStatus])}
                    type="submit"
                    disabled={fetchStatus === 'loading'}>
                    <div className={styles.icon__wrapper}>
                        <div className={styles.icon}></div>
                    </div>
                    <div className={styles.text__wrapper}>
                        <div className={clsx(styles.text, styles[fetchStatus])}>
                            {fetchStatus === 'idle' && "Send"}
                            {fetchStatus === 'loading' && "Sending..."}
                            {fetchStatus === 'success' && "Sent ✓"}
                        </div>
                    </div>
                </button>
            </form>
            <span className={styles.form__notify}>*PDF file with the full test result will be sent automatically if the checkbox is selected.</span>
        </div>
    )

}

