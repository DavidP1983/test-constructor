/**
 * Custom hook for managing a search input with URL sync and debounce.
 *
 * @returns {Object} An object containing search state and handlers.
 * @property {boolean} isOpen - Indicates whether the search input is open.
 * @property {string} value - Current value of the search input.
 * @property {(value: string) => void} setValue - Function to update the search input value.
 * @property {() => void} handleOpen - Toggles the `isOpen` state of the search input.
 *
 * @example
 * const { isOpen, value, setValue, handleOpen } = useSearch();
 *
 * // Open or close search input
 * handleOpen();
 *
 * // Update input value
 * setValue("test query");
 */

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "./useDebounce";

export const useSearch = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [value, setValue] = useState('');
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathName = usePathname();
    const debounced = useDebounce(value, 500);

    const handleOpen = () => {
        setIsOpen((prev) => !prev);
    }

    useEffect(() => {
        const params = new URLSearchParams(searchParams)
        if (value) {
            params.set("q", value)
        } else {
            params.delete('q')
        }
        router.replace(`${pathName}?${params.toString()}`)
    }, [debounced]);

    return {
        isOpen,
        value,
        setValue,
        handleOpen
    }
}