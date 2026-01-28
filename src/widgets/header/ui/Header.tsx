'use client';

import { useProfile } from "@/entities/profile-info/model/store";
import { useCompletedTestsStore } from "@/widgets/test-pass/model/store";
import clsx from "clsx";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { menuItems } from "../model/menuItems";
import { useHeader } from "../model/useHeader";

import styles from '@/styles/blocks/header.module.scss';
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";

export default function Header() {

    const {
        myRef,
        isOpenMenu,
        userData,
        handleClick,
        handleLogout,
        isOn,
        toggleSwitch
    } = useHeader();
    const avatar = useProfile(state => state.avatarUrl);

    const { calculateCompletedTests, registerCompletedTest, totalCompletedTests } = useCompletedTestsStore(useShallow((state) => ({
        calculateCompletedTests: state.calculateCompletedTests,
        totalCompletedTests: state.totalCompletedTests,
        registerCompletedTest: state.registerCompletedTest
    })));

    // Обновление bell уведомления о кол-ве пройденных тестов, а так же сбор id пройденных тестов. Реализованно в useTestPassPage
    useEffect(() => {
        const channel = new BroadcastChannel('completed-tests');
        channel.onmessage = (event) => {
            if (event.data.type === 'TEST_COMPLETED') {
                console.log('TEST_COMPLETED received in Header');
                calculateCompletedTests();            // кол-во пройденных тестов
                const token = event.data.token;
                if (token) {
                    registerCompletedTest(token)      // сбор id пройденных тестов
                }
            }
        }

        return () => channel.close();
    }, [calculateCompletedTests, registerCompletedTest]);


    return (
        <header className={styles.header} ref={myRef}>
            <div className={styles.header__desc}>
                <div className={styles.header__title}>{userData?.name}</div>
                <div className={styles.header__img}>
                    <Image
                        src={avatar ?? "/assets/user-icon.webp"}
                        alt="user"
                        loading="eager"
                        width={50}
                        height={50}
                        onClick={handleClick}
                    />
                </div>
            </div>
            <div className={clsx(styles.header__bell, totalCompletedTests && styles.isNewTest)}>
                <Link href={`/builder/completed?id=${userData?.id}`} className='icon-bell'></Link>
                <span>{totalCompletedTests}</span>
            </div>
            <div className={clsx(styles.menu, isOpenMenu && styles.active)}>
                <ul role='list' >
                    {
                        menuItems.map(items => (
                            <li
                                key={items.id}
                                onClick={handleClick}>
                                <i className={items.className}></i>
                                <Link
                                    href={items.text === 'Completed' ? `${items.href}?id=${userData?.id}` : items.href}>{items.text}</Link>
                            </li>
                        ))
                    }
                    <li>
                        <i className='icon-logout'></i>
                        <button onClick={handleLogout}>Log out</button>
                    </li>
                    <li>
                        <button
                            className={clsx(styles.toggle__container, isOn ? styles.on : styles.off)}
                            onClick={toggleSwitch}
                        >
                            <motion.div
                                className={isOn ? "icon-moon" : "icon-sun"}
                                data-btn={isOn ? "moon" : "sun"}
                                layout
                                transition={{
                                    type: "spring",
                                    visualDuration: 0.2,
                                    bounce: 0.2,
                                }}
                            />
                        </button>
                    </li>
                </ul>
            </div>
        </header>
    )
}