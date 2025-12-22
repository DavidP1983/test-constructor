import { CheckboxButton } from '@/features/test-actions/question-actions/ui/CheckboxButton';
import { RadioButton } from '@/features/test-actions/question-actions/ui/RadioButton';
import { Options } from '@/shared/types/test-type';
import { Mode } from './renderActions';

import styles from '@/styles/blocks/create.module.scss';


interface Props {
    options: Options[];
    type: string;
    id: string;
    mode: Mode;
}

export const TestQuestionItem = ({ options, type, id, mode }: Props) => {


    if (!options?.length) {
        return <div className={styles.create__question_answer}>Please create answers</div>
    }
    return (
        <>
            {
                options.map(item => (
                    <li key={item.id} className={styles.items}>
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