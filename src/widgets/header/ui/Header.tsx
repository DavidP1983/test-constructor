'use client';
import clsx from "clsx";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import styles from '@/styles/blocks/header.module.scss';


export default function Header() {
    const [isOpenMenu, setIsOpenMenu] = useState(false);
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



    return (
        <header className={styles.header} ref={myRef}>
            <div className={styles.header__img}>
                <Image
                    src="/assets/user-icon.webp"
                    alt="user"
                    loading="eager"
                    width={50}
                    height={30}
                    onClick={handleClick} />
            </div>
            <div className={clsx(styles.menu, isOpenMenu && styles.active)}>
                <ul role='list'>
                    <li><Link href="/builder">My Tests</Link></li>
                    <li><Link href="/builder/completed">Completed</Link></li>
                    <li><a href="">Profile</a></li>
                    <li><a href="">Log out</a></li>
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