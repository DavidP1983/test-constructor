import { SpinnerForBtn } from '@/shared/ui/spinner/SpinnerForBtn';

import styles from '@/styles/flashcard-block/flashcard.module.scss';

export const StudyButton = ({ onClick, studyStep, isEmpty, pending }:
    {
        onClick: () => Promise<void>,
        studyStep: boolean,
        isEmpty: boolean,
        pending: boolean
    }) => {

    const showTexDescription = (step: boolean, save: boolean) => {
        if (save) {
            return <>Saving Changes... <SpinnerForBtn /></>
        }
        return step ? 'Back to Cards' : 'Start study';
    }

    return (
        <button
            className={styles.btn__start}
            onClick={onClick}
            disabled={isEmpty || pending} >
            {showTexDescription(studyStep, pending)}
        </button>
    );
}
