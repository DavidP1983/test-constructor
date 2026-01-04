'use client';

import { useTheme } from 'next-themes';
import { useEffect } from 'react';

interface Props {
    children: React.ReactNode
}

export const ThemeTransitionWrapper = ({ children }: Props) => {
    const { theme } = useTheme()

    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty("--background", theme === 'dark' ? '#242434ff' : '#e3dede42')
        root.style.setProperty("--text--color", theme === 'dark' ? '#ffffff' : '#242434ff')
        root.style.setProperty("--text--color-sideBar", theme === 'dark' ? '#ffffff' : 'hsl(200, 14%, 30%)')
        root.style.setProperty("--shadow--color", theme === 'dark' ? '0 4px 48px rgb(109 247 234 / 38%)' : '0 10px 36px rgba(0, 0, 0, 0.16)')
    }, [theme])

    return (
        <>{children}</>
    )
}
