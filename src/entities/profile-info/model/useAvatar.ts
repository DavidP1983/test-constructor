'use client';

import { notify } from "@/shared/utils/notify";
import { useProfile } from "./store";

export const useAvatar = () => {
    const setAvatar = useProfile(state => state.setAvatar)
    const MAX_SIZE = 5 * 1024 * 1024;


    function readFile(file: File, cb: (dataUrl: string | ArrayBuffer | null, file: File) => void) {
        const read = new FileReader();
        read.onload = () => {
            cb(read.result, file)
        }
        read.onerror = () => {
            notify("error", "Error")
        }
        read.readAsDataURL(file)
    }


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        if (!file.type.startsWith('image/')) {
            const errorTitle = "Unsupported file format. Allowed formats: JPG, PNG, WEBP";
            notify("error", errorTitle)
            return;
        };
        if (file.size > MAX_SIZE) {
            const errorTitle = "File is too large. Maximum allowed size is 5 MB.";
            notify("error", errorTitle)
            return;
        };
        readFile(file, (dataUrl: string | ArrayBuffer | null) => {
            if (typeof (dataUrl) !== 'string') return;
            setAvatar(dataUrl);
        })
    }

    return { handleChange }
}