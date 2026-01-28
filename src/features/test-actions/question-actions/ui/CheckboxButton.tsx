
import { OptionButton } from '@/shared/types/option-button';
import { useId } from 'react';
import { AnswerActions } from './common/AnswerActions';

import styles from '@/styles/blocks/checkbox.module.scss';


export const CheckboxButton = ({ label, answerId, questionId, mode, onChange }: OptionButton) => {
    const ids = useId();

    return (
        <>
            <label htmlFor={ids} className={styles.container}>{label}
                {' '}
                <input
                    type="checkbox"
                    id={ids}
                    value={ids}
                    name='checkbox'
                    onChange={() => onChange?.(answerId, questionId, 'checkbox')} />
                <span className={styles.checkmark}></span>
            </label>
            {mode !== 'preview' && mode !== 'pass' &&
                <AnswerActions
                    questionId={questionId}
                    answerId={answerId}
                    label={label}
                />
            }
        </>

    );
}