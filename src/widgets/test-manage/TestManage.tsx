'use client';
import { TestQuestion } from "@/features/test-questions/ui/TestQuestions";
import { AllTests } from "@/shared/types/test-type";
import clsx from "clsx";


import styles from '@/styles/blocks/create.module.scss';


interface Props {
    title: string;
    singleTest?: AllTests;
}

export const TestManage = ({ title, singleTest }: Props) => {
    return (
        <>
            <main className={styles.main}>
                <section aria-labelledby="create test section" className={styles.create}>
                    <div className="container">
                        <h1 className={clsx("title", styles.title_centre)}>{title}</h1>
                        <p className={styles.rules}>* reorder
                            <span
                                role="link"
                                tabIndex={0}
                                aria-label="Reorder Elements"
                                className={styles.tooltip_box}
                            > Tests can be moved only in edit or create mode.</span>
                        </p>
                        <TestQuestion
                            singleTest={singleTest}

                        />
                    </div>
                </section>
            </main>
        </>
    );
} 