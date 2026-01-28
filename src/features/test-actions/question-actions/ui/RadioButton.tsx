import { OptionButton } from '@/shared/types/option-button';
import { useId } from 'react';
import { AnswerActions } from './common/AnswerActions';

import styles from '@/styles/blocks/radio.module.scss';


export const RadioButton = ({ label, answerId, questionId, mode, onChange }: OptionButton) => {
    const ids = useId();

    return (
        <>
            <label htmlFor={ids} className={styles.container}>{label}
                {' '}
                <input
                    type="radio"
                    id={ids}
                    value={ids}
                    name={questionId}
                    onChange={() => onChange?.(answerId, questionId, 'radio')} />
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