'use client';

import { useTheme } from 'next-themes';
import { useEffect } from 'react';

interface Props {
    children: React.ReactNode
}

export const ThemeTransitionWrapper = ({ children }: Props) => {
    const { theme } = useTheme();

    const hoverCardEffectLight = `0 4px 6px rgba(0, 0, 0, 0.1),
            0 10px 20px rgba(0, 0, 0, 0.15)`;

    const hoverCardEffectDark = `0 0 16px rgba(255, 255, 255, 0.18),
        0 0 32px rgba(255, 255, 255, 0.24)`;


    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty("--background", theme === 'dark' ? '#242434ff' : '#e3dede42')
        root.style.setProperty("--background--flash", theme === 'dark' ? '#242434ff' : '#F0F1F3')
        root.style.setProperty("--background--flash--item", theme === 'dark' ? '#1E293B' : '#EAEFF6')
        root.style.setProperty("--background--item--active", theme === 'dark' ? '#224391fc' : '#a7d7fa ')
        root.style.setProperty("--card-hover-shadow", theme === 'dark' ? hoverCardEffectDark : hoverCardEffectLight)
        root.style.setProperty("--text--color", theme === 'dark' ? '#ffffff' : '#242434ff')
        root.style.setProperty("--text--flash", theme === 'dark' ? '#ffffff' : '#2C3649')
        root.style.setProperty("--text--color-sideBar", theme === 'dark' ? '#ffffff' : 'hsl(200, 14%, 30%)')
        root.style.setProperty("--shadow--color", theme === 'dark' ? '0 4px 48px rgb(109 247 234 / 38%)' : '0 10px 36px rgba(0, 0, 0, 0.16)')
    }, [theme]);

    return (
        <>{children}</>
    )
}
