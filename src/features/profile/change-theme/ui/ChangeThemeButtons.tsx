'use client';
import { useTheme } from 'next-themes';

import styles from '@/styles/blocks/profile.module.scss';


export const ChangeThemeButtons = () => {
    const { setTheme } = useTheme();

    return (
        <div className={styles.profile__settings_theme}>
            <div className="desc">Theme -
                <button
                    className="icon-sun"
                    aria-label="icon sun"
                    data-btn="sun"
                    onClick={() => setTheme("light")} />
                <button
                    className="icon-moon"
                    aria-label="icon moon"
                    data-btn="moon"
                    onClick={() => setTheme("dark")} />
            </div>
        </div>
    )
}