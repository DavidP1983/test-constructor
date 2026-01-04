import { CheckboxButton } from '@/features/test-actions/question-actions/ui/CheckboxButton';
import { RadioButton } from '@/features/test-actions/question-actions/ui/RadioButton';
import { Options } from '@/shared/types/test-type';
import clsx from 'clsx';
import { Mode } from './renderActions';

import styles from '@/styles/blocks/create.module.scss';


interface Props {
    options: Options[];
    type: string;
    id: string;
    mode: Mode;
    appearingQuestionId: string | null;
    disappearingQuestionId: string | null;
}

export const TestQuestionItem = ({ options, type, id, mode, appearingQuestionId, disappearingQuestionId }: Props) => {


    if (!options?.length) {
        return <div className={styles.create__question_answer}>Please create answers</div>
    }
    return (
        <>
            {
                options.map(item => (
                    <li key={item.id} className={
                        clsx(
                            styles.items,
                            disappearingQuestionId === item.id && styles.isDisappearing,
                            appearingQuestionId === item.id && styles.isAppearing,
                        )}>
                        {
                            type === 'radio'
                                ?
                                <RadioButton
                                    label={item.question}
                                    answerId={item.id}
                                    questionId={id}
                                    mode={mode} />
                                :
                                <CheckboxButton
                                    label={item.question}
                                    answerId={item.id}
                                    questionId={id}
                                    mode={mode} />}
                    </li>
                ))
            }
        </>
    )
}