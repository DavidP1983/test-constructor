'use client';

import { useProfile } from "@/entities/profile-info/model/store";
import clsx from "clsx";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { menuItems } from "../model/menuItems";
import { useHeader } from "../model/useHeader";

import styles from '@/styles/blocks/header.module.scss';

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
            <div className={clsx(styles.menu, isOpenMenu && styles.active)}>
                <ul role='list' >
                    {
                        menuItems.map(items => (
                            <li
                                key={items.id}
                                onClick={handleClick}>
                                <i className={items.className}></i>
                                <Link href={items.href}>{items.text}</Link>
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