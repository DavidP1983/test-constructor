'use client';

import { baseHeader } from "@/entities/table/ui/table-header/baseHeader";
import { useAllTests } from "@/entities/test-operation/hooks/useAllTests";
import { SearchTest } from "@/features/search-test/ui/SearchTest";
import { AllTests } from "@/shared/types/test-type";
import { StatusContent } from "@/shared/ui/status-content/StatusContent";
import clsx from "clsx";
import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import SideBar from "../sidebar/ui/SideBar";
import { renderRow } from "../table-row/ui/renderRow";
import Table from "../table/Table";
import { tableVariants } from "./animations";

import styles from '@/styles/blocks/table.module.scss';

const MotionLink = motion.create(Link);

export const AllTestsPageClient = () => {
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
    const { data, contentHeader, status, error, isPlaceholderData } = useAllTests();


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
                            <motion.h1
                                className="title"
                                initial={{ x: -100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}>
                                My Tests
                            </motion.h1>

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}>
                                <SearchTest />
                            </motion.div>

                            <MotionLink
                                className={styles.test__create}
                                href="/create"
                                initial={{ x: 30, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 1, ease: "easeOut" }}
                            >
                                Create
                            </MotionLink>
                        </div>
                        <StatusContent<AllTests>
                            data={data}
                            status={status}
                            error={error}
                            renderEmpty={() => (
                                <div className={styles.test__empty}>Create your first test, click on the button <strong>Create</strong></div>
                            )}
                            renderData={(data) => (
                                <motion.div
                                    className={styles.test__table}
                                    variants={tableVariants}
                                    initial="initial"
                                    animate={isPlaceholderData ? 'placeholder' : 'ready'}
                                >
                                    <Table<AllTests>
                                        dataRow={data}
                                        dataHeader={contentHeader}
                                        renderHeader={baseHeader}
                                        renderRow={renderRow} />
                                </motion.div>
                            )}
                        />
                    </div>
                </section>
            </main>
        </>
    )
}