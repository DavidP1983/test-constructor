'use client';

import { CompletedTestResult } from '@/entities/completed-test/ui/CompletedTestResult';
import { TestSummary } from '@/entities/completed-test/ui/TestSummary';
import { CompletedTest } from '@/shared/types/completed-type';
import { AllTests } from '@/shared/types/test-type';
import { useCompletedTestsStore } from '@/widgets/test-pass/model/store';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useShallow } from 'zustand/shallow';


import styles from '@/styles/blocks/create.module.scss';

export interface TestPassResultProps {
    originTest: AllTests;
    completedTest: CompletedTest;
}

export const TestPassResult = ({ originTest, completedTest }: TestPassResultProps) => {

    const router = useRouter();
    const { markCompletedTestAsViewed, changeBtnStatusAsViewed } = useCompletedTestsStore(useShallow((state) => ({
        markCompletedTestAsViewed: state.markCompletedTestAsViewed,
        changeBtnStatusAsViewed: state.changeBtnStatusAsViewed
    })));


    return (

        <main className={styles.main}>
            <section aria-labelledby="result test section" className={styles.create}>
                <div className="container">
                    <h1 className={clsx("title", styles.title_centre)}>{completedTest.testName}</h1>
                    <div className={styles.create__content}
                        style={{ background: 'white', padding: '20px', marginTop: '20px' }}>

                        <CompletedTestResult
                            originTest={originTest}
                            completedTest={completedTest} />

                        <button
                            className={styles.send__answers}
                            onClick={() => {
                                router.push(`/builder/completed?id=${completedTest.authorId}`);
                                markCompletedTestAsViewed(completedTest.accessToken);
                                changeBtnStatusAsViewed(completedTest._id)
                            }}>
                            &#8592; Go back
                        </button>
                    </div>
                </div>
            </section>
            <TestSummary completedTest={completedTest} />
        </main>
    )
}


