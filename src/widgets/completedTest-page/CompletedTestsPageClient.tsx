"use client";

import { baseHeader } from "@/entities/table/ui/table-header/baseHeader";
import { useCompletedTests } from "@/entities/test-operation/hooks/useCompletedTests";
import { CompletedTest } from "@/shared/types/completed-type";
import { StatusContent } from "@/shared/ui/status-content/StatusContent";
import clsx from "clsx";
import { useState } from "react";
import SideBar from "../sidebar/ui/SideBar";
import { renderRowCompleted } from "../table-row/ui/renderRowCompleted";
import Table from "../table/Table";

import styles from '@/styles/blocks/table.module.scss';
import { useCompletedTestsStore } from "../test-pass/model/store";


export const CompletedTestsPageClient = () => {
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
    const { data, status, error, contentHeader } = useCompletedTests();
    const completedTestsToken = useCompletedTestsStore(state => state.completedTestsToken);

    const classNames = clsx({
        [styles.main]: true,
        [styles.active]: isSideBarOpen
    });


    return (
        <>
            <SideBar toggle={setIsSideBarOpen} />
            <main className={classNames}>
                <section aria-labelledby="completed test section" className={styles.test}>
                    <div className="container">
                        <div className={styles.test__header}>
                            <h1 className="title">Completed Tests</h1>
                        </div>
                        <StatusContent<CompletedTest>
                            data={data}
                            status={status}
                            error={error}
                            renderEmpty={() => (
                                <div className={styles.test__empty}>There are no test completed</div>
                            )}
                            renderData={(data) => (
                                <div className={styles.test__table}>
                                    <Table<CompletedTest>
                                        dataRow={data}
                                        dataHeader={contentHeader}
                                        renderHeader={baseHeader}
                                        renderRow={renderRowCompleted}
                                        token={completedTestsToken} />
                                </div>
                            )}
                        />
                    </div>
                </section>
            </main >
        </>
    )
}