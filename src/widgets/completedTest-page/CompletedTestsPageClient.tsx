"use client";

import { baseHeader } from "@/entities/table/ui/table-header/baseHeader";
import { useCompletedTests } from "@/entities/test-operation/hooks/useCompletedTests";
import { useFilterTests } from "@/features/sort-test/model/useFilterTests";
import { FilterTests } from "@/features/sort-test/ui/FilterTests";
import { useTableVirtualizer } from "@/shared/hooks/useTableVirtualizer";
import { CompletedTest } from "@/shared/types/completed-type";
import { GoTopButton } from "@/shared/ui/goTopButton/goTopButton";
import { StatusContent } from "@/shared/ui/status-content/StatusContent";
import clsx from "clsx";
import { useAnimate } from "motion/react";
import { useEffect, useState } from "react";
import { SideBar } from "../sidebar/ui/SideBar";
import { renderRowCompleted } from "../table-row/ui/renderRowCompleted";
import Table from "../table/Table";
import { useCompletedTestsStore } from "../test-pass/model/store";

import styles from '@/styles/blocks/table.module.scss';


export const CompletedTestsPageClient = () => {
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
    const { data, status, error, contentHeader } = useCompletedTests();
    const completedTestsToken = useCompletedTestsStore(state => state.completedTestsToken);
    const {
        filter,
        sort,
        handleFilterCompletedTest,
        handleSortCompletedTest,
        filteredAndSortedData } = useFilterTests(data, completedTestsToken);
    const { parentRef, virtualizer, element } = useTableVirtualizer(filteredAndSortedData.length, 344, 60);
    const [scope, animate] = useAnimate();

    useEffect(() => {
        if (!scope.current) return
        animate(scope.current, { opacity: [0, 1], y: [10, 0] }, {
            duration: 0.4,
            ease: 'easeOut',
            type: 'spring',
            stiffness: 120,
            damping: 20
        })

    }, [filter, sort, scope, animate])


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
                        <FilterTests
                            filterStatus={filter}
                            sortStatus={sort}
                            setFilter={handleFilterCompletedTest}
                            setSort={handleSortCompletedTest}
                            status={status} />
                        <StatusContent<CompletedTest>
                            data={filteredAndSortedData}
                            status={status}
                            error={error}
                            renderEmpty={() => (
                                <div className={styles.test__empty}>There are no test completed</div>
                            )}
                            renderData={(data) => (
                                <div ref={scope}>
                                    <div
                                        className={styles.test__table}
                                        ref={parentRef}>
                                        <Table<CompletedTest>
                                            dataRow={data}
                                            dataHeader={contentHeader}
                                            renderHeader={baseHeader}
                                            renderRow={renderRowCompleted}
                                            token={completedTestsToken}
                                            virtualizer={virtualizer} />
                                    </div>
                                </div>
                            )}
                        />
                        <GoTopButton ref={element} />
                    </div>
                </section>
            </main >
        </>
    )
}


