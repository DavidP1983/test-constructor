
import { ActionButtonProps } from '@/shared/types/test-type';
import { useId } from 'react';
import { AnswerActions } from './common/AnswerActions';

import styles from '@/styles/blocks/checkbox.module.scss';


export const CheckboxButton = ({ label, answerId, questionId, mode }: ActionButtonProps) => {
    const ids = useId();

    return (
        <>
            <label htmlFor={ids} className={styles.container}>{label}
                {' '}
                <input type="checkbox" id={ids} name="checkbox" value={ids} />
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