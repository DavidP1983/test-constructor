import { Button } from '@/shared/ui/button/Button';
import { SpinnerForBtn } from '@/shared/ui/spinner/SpinnerForBtn';

import styles from '@/styles/flashcard-block/flashcard.module.scss';

interface Props {
    onClick: () => Promise<void>;
    studyStep: boolean;
    isEmpty: boolean;
    pending: boolean;
}

export const StudyButton = ({ onClick, studyStep, isEmpty, pending }: Props) => {


    return (
        <div className={styles.block__start}>
            <Button
                className={styles.btn__start}
                onClick={onClick}
                disabled={isEmpty || pending}
                type='button'>
                {pending
                    ? <>Saving Changes... <SpinnerForBtn /></>
                    : studyStep
                        ? 'Back to Cards'
                        : 'Start study'

                }
            </Button>
            {isEmpty && <p className={styles.empty}>No cards to study</p>}
        </div>

    );
}
