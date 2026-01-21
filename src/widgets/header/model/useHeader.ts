import { useAvatar } from "@/entities/profile-info/model/useAvatar";
import { useLoginForm } from "@/features/auth/login/model/store";
import { useTest } from "@/features/test-actions/save-question/model/store";
import { notify } from "@/shared/utils/notify";
import { useQueryClient } from "@tanstack/react-query";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useShallow } from "zustand/shallow";

export const useHeader = () => {
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const [isOn, setIsOn] = useState(false);

    const { logout, userData } = useLoginForm(useShallow((state) => ({
        logout: state.logout,
        userData: state.userData,
    })));

    const resetTotalCreatedTests = useTest(state => state.resetTotalCreatedTests);
    const router = useRouter();
    const queryClient = useQueryClient();
    const { clearAvatar } = useAvatar();


    const myRef = useRef<HTMLDivElement | null>(null);
    const { setTheme } = useTheme();

    // Скрытие меню при клике на body
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (myRef.current && !myRef.current.contains(e.target as Node)) {
                setIsOpenMenu(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, []);


    // Открытие меню
    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        setIsOpenMenu(prev => !prev)
    }

    const handleLogout = async () => {
        setIsOpenMenu(false)
        await logout();
        resetTotalCreatedTests();
        queryClient.cancelQueries();
        queryClient.clear();
        clearAvatar();
        router.push("/");
        await new Promise((r) => setTimeout(r, 1000)); // откладываю выполнения notify
        notify('success', 'You have successfully logged out.')
    }

    const toggleSwitch = () => {
        setIsOn(prev => !prev);
    };

    useEffect(() => {
        setTheme(isOn ? "dark" : "light");
    }, [isOn, setTheme]);


    return {
        myRef,
        isOpenMenu,
        userData,
        setTheme,
        handleClick,
        handleLogout,
        toggleSwitch,
        isOn
    }
}