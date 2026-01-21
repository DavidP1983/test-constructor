"use client";

import clsx from "clsx";
import { useState } from "react";

import { baseHeader } from "@/entities/table/ui/table-header/baseHeader";
import { useCompletedTests } from "@/entities/test-operation/hooks/useCompletedTests";
import { AllTests } from "@/shared/types/test-type";
import { StatusContent } from "@/shared/ui/status-content/StatusContent";
import styles from '@/styles/blocks/table.module.scss';
import SideBar from "../sidebar/ui/SideBar";
import { renderRowCompleted } from "../table-row/ui/renderRowCompleted";
import Table from "../table/Table";


export const CompletedTestsPageClient = () => {
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
    const { data, status, error, contentHeader } = useCompletedTests();

    const classNames = clsx({
        [styles.main]: true,
        [styles.active]: isSideBarOpen
    });

    if (!data) {
        return []
    }

    return (
        <>
            <SideBar toggle={setIsSideBarOpen} />
            <main className={classNames}>
                <section aria-labelledby="completed test section" className={styles.test}>
                    <div className="container">
                        <div className={styles.test__header}>
                            <h1 className="title">Completed Tests</h1>
                        </div>
                        <StatusContent<AllTests>
                            data={data}
                            status={status}
                            error={error}
                            completed="completed"
                            renderEmpty={() => (
                                <div className={styles.test__empty}>There are no test completed</div>
                            )}
                            renderData={(data, completed) => (
                                <div className={styles.test__table}>
                                    <Table
                                        dataRow={data}
                                        dataHeader={contentHeader}
                                        renderHeader={baseHeader}
                                        renderRow={renderRowCompleted}
                                        status={completed} />
                                </div>
                            )}
                        />
                    </div>
                </section>
            </main >
        </>
    )
}