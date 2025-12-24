'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface Props {
    children: React.ReactNode
}

export const ThemeTransitionWrapper = ({ children }: Props) => {
    const { theme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        setMounted(true);
    }, [])

    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty("--background", theme === 'dark' ? '#242434ff' : '#e3dede42')
        root.style.setProperty("--text--color", theme === 'dark' ? '#ffffff' : '#242434ff')
        root.style.setProperty("--text--color-sideBar", theme === 'dark' ? '#ffffff' : 'hsl(200, 14%, 30%)')
    }, [theme])

    if (!mounted) return null

    return (
        <>{children}</>
    )
}
