import { useDeleteCompletedTest } from '@/entities/test-operation/hooks/useDeleteCompletedTest';
import { useCompletedTestsStore } from '@/widgets/test-pass/model/store';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';

import styles from '@/styles/blocks/table.module.scss';


export const TableCompletedActions = ({ testId }: { testId: string | undefined }) => {
    const router = useRouter();
    const { handleDeleteCompletedTest } = useDeleteCompletedTest();
    const viewedTests = useCompletedTestsStore(state => state.viewedTests);

    let isViewed = false;
    if (testId) {
        isViewed = viewedTests.includes(testId)
    }

    return (
        <div className={styles.table__btn_group}>
            <button
                className={styles.completed}
                data-btn="open"
                aria-labelledby="open-test"
                onClick={() => router.push(`/builder/completed/${testId}`)}>{isViewed ? 'Viewed' : 'View result'}</button>

            <button
                className={clsx(styles.delete, isViewed && styles.isViewed)}
                data-btn="delete"
                aria-labelledby="delete-test"
                onClick={() => handleDeleteCompletedTest(testId)}
            >Delete</button>
        </div>
    )
}
