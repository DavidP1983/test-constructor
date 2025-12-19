
import { ActionButtonProps } from '@/shared/types/test-type';
import styles from '@/styles/blocks/radio.module.scss';
import { useId } from 'react';
import { AnswerActions } from './common/AnswerActions';


export const RadioButton = ({ label, answerId, questionId, mode }: ActionButtonProps) => {
    const ids = useId();

    return (
        <>
            <label htmlFor={ids} className={styles.container}>{label}
                {' '}
                <input type="radio" id={ids} name="radio" value={ids} />
                <span className={styles.checkmark}></span>
            </label>
            {mode !== 'preview' &&
                <AnswerActions
                    questionId={questionId}
                    answerId={answerId}
                    label={label}
                />
            }

        </>
    );
}