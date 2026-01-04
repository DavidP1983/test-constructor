'use client';

import { baseHeader } from "@/entities/table/ui/table-header/baseHeader";
import { useAllTests } from "@/entities/test-operation/hooks/useAllTests";
import { SearchTest } from "@/features/search-test/ui/SearchTest";
import { AllTests } from "@/shared/types/test-type";
import { StatusContent } from "@/shared/ui/status-content/StatusContent";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import SideBar from "../sidebar/ui/SideBar";
import { renderRow } from "../table-row/ui/renderRow";
import Table from "../table/Table";

import styles from '@/styles/blocks/table.module.scss';


export const AllTestsPageClient = () => {
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
    const { data, contentHeader, status, isPlaceholderData } = useAllTests();

    const classNames = clsx({
        [styles.main]: true,
        [styles.active]: isSideBarOpen
    });

    return (
        <>
            <SideBar toggle={setIsSideBarOpen} />
            <main className={classNames}>
                <section aria-labelledby="test section" className={styles.test}>
                    <div className="container">
                        <div className={styles.test__header}>
                            <h1 className="title">My Tests</h1>
                            <SearchTest />
                            <Link className={styles.test__create} href='/create'>Create</Link>
                        </div>
                        <StatusContent<AllTests>
                            data={data}
                            status={status}
                            renderEmpty={() => (
                                <div className={styles.test__empty}>Create your first test, click on the button <strong>Create</strong></div>
                            )}
                            renderData={(data) => (
                                <div className={styles.test__table} style={{ opacity: isPlaceholderData ? 0.5 : '' }}>
                                    <Table
                                        dataRow={data}
                                        dataHeader={contentHeader}
                                        renderHeader={baseHeader}
                                        renderRow={renderRow} />
                                </div>
                            )}
                        />
                    </div>
                </section>
            </main>
        </>
    )
}