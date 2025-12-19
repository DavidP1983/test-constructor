'use client';

import Image from 'next/image';
import Link from 'next/link';

import styles from '@/styles/blocks/sidebar.module.scss';


export default function SideBar({ toggle }: Readonly<{ toggle: (val: boolean) => void }>) {

    return (
        <aside className={styles.vertical__sidebar}>
            <input
                type="checkbox"
                role="switch"
                id="checkbox-input"
                className="checkbox-input"
                onChange={(e) => toggle(e.target.checked)}
            />
            <nav className={styles.nav}>
                <header className={styles.header}>
                    <div className={styles.sidebar__toggle_container}>
                        <label tabIndex={0} htmlFor="checkbox-input" id="label-for-checkbox-input" className={styles.nav__toggle}>
                            <span className={styles.toggle__icons} aria-hidden="true">
                                <svg width="24" height="24" viewBox="0 0 24 24" className={styles.toggle__svg_icon + " " + styles.toggle__open}>
                                    <path d="M3 5a1 1 0 1 0 0 2h18a1 1 0 1 0 0-2zM2 12a1 1 0 0 1 1-1h18a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1M2 18a1 1 0 0 1 1-1h18a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1"></path>
                                </svg>
                                <svg width="24" height="24" viewBox="0 0 24 24" className={styles.toggle__svg_icon + " " + styles.toggle__close}>
                                    <path d="M18.707 6.707a1 1 0 0 0-1.414-1.414L12 10.586 6.707 5.293a1 1 0 0 0-1.414 1.414L10.586 12l-5.293 5.293a1 1 0 1 0 1.414 1.414L12 13.414l5.293 5.293a1 1 0 0 0 1.414-1.414L13.414 12z"> </path>
                                </svg>
                            </span>
                        </label>
                    </div>
                    <figure className={styles.figure}>
                        <Image
                            className={styles.logo}
                            src="/assets/user-icon.webp"
                            alt='profile'
                            width={100}
                            height={100}
                        />
                        <figcaption className={styles.figcaption}>
                            <p className={styles.user__id}>Profile</p>
                        </figcaption>
                    </figure>
                </header>
                <section className={styles.sidebar__wrapper}>
                    <ul className={styles.sidebar__list + " " + styles.list__primary}>
                        <li className={styles.sidebar__item + " " + styles.item__heading}>
                            <h2 className={styles.sidebar__item_heading}>general</h2>
                        </li>
                        <li className={styles.sidebar__item}>
                            <Link className={styles.sidebar__link} href="/profile" data-tooltip="Tests">
                                <div className={styles.icon}>
                                    <span className='icon-graduation-cap'></span>
                                </div>
                                <p className={styles.text}>My Tests</p>
                            </Link>
                        </li>
                        <li className={styles.sidebar__item}>
                            <Link className={styles.sidebar__link} href="/profile/completed" data-tooltip="Completed">
                                <div className={styles.icon}>
                                    <span className='icon-check icon'></span>
                                </div>
                                <p className={styles.text}>Completed</p>
                            </Link>
                        </li>
                    </ul>
                    <ul className={styles.sidebar__list + " " + styles.list__secondary}>
                        <li className={styles.sidebar__item + " " + styles.item__heading}>
                            <h2 className={styles.sidebar__item_heading}>general</h2>
                        </li>
                        <li className={styles.sidebar__item}>
                            <a className={styles.sidebar__link} href="#" data-tooltip="Profile">
                                <div className={styles.icon}>
                                    <span className="icon-user"></span>
                                </div>
                                <p className={styles.text}>Profile</p>
                            </a>
                        </li>
                        <li className={styles.sidebar__item}>
                            <a className={styles.sidebar__link} href="#" data-tooltip="Logout">
                                <div className={styles.icon}>
                                    <span className='icon-logout'></span>
                                </div>
                                <p className={styles.text}>Logout</p>
                            </a>
                        </li>
                    </ul>
                </section>
            </nav>
        </aside>
    );

}