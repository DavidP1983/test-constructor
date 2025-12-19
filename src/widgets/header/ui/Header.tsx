'use client';
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import styles from '@/styles/blocks/header.module.scss';
import Link from "next/link";


export default function Header() {
    const [isOpenMenu, setIsOpenMenu] = useState(false);
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
                    <li><Link href="/profile">My Tests</Link></li>
                    <li><Link href="/profile/completed">Completed</Link></li>
                    <li><a href="">Profile</a></li>
                    <li><a href="">Log out</a></li>
                </ul>
            </div>
        </header>
    )
}