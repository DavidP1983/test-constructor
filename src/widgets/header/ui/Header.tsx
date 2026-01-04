'use client';
import { useProfile } from "@/entities/profile-info/model/store";
import { useLoginForm } from "@/features/auth/login/model/store";
import { useTest } from "@/features/test-actions/save-question/model/store";
import clsx from "clsx";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";


import styles from '@/styles/blocks/header.module.scss';
import { useShallow } from "zustand/shallow";


export default function Header() {
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const avatar = useProfile(state => state.avatar);
    const { logout, userData } = useLoginForm(useShallow((state) => ({
        logout: state.logout,
        userData: state.userData
    })));
    const resetTotalCreatedTests = useTest(state => state.resetTotalCreatedTests);
    const router = useRouter();

    const { setTheme } = useTheme();
    const myRef = useRef<HTMLDivElement | null>(null);


    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation()
        setIsOpenMenu(prev => !prev)
    }

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (myRef.current && !myRef.current.contains(e.target as Node)) {
                setIsOpenMenu(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, []);


    const handleLogout = () => {
        logout();
        resetTotalCreatedTests();
        router.push("/");
    }


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
                        height={30}
                        onClick={handleClick} />
                </div>
            </div>
            <div className={clsx(styles.menu, isOpenMenu && styles.active)}>
                <ul role='list' onClick={handleClick}>
                    <li><Link href="/builder">My Tests</Link></li>
                    <li><Link href="/builder/completed">Completed</Link></li>
                    <li><Link href="/profile">Profile</Link></li>
                    <li><button onClick={handleLogout}>Log out</button></li>
                    <li>
                        <button
                            className="icon-sun"
                            aria-label="icon sun"
                            onClick={() => setTheme("light")}
                        ><span>Light mode</span></button>

                    </li>
                    <li>
                        <button
                            className="icon-moon"
                            aria-label="icon moon"
                            onClick={() => setTheme("dark")}
                        ><span>Dark mode</span></button>
                    </li>
                </ul>
            </div>
        </header>
    )
}