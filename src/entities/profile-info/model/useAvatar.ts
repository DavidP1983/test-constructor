'use client';

import { useLoginForm } from "@/features/auth/login/model/store";
import { UserService } from "@/features/profile/user-security/services/UserService";
import { notify } from "@/shared/utils/notify";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useProfile } from "./store";

export const useAvatar = () => {
    const [isUploading, setIsUploading] = useState(false);
    const id = useLoginForm(state => state.userData?.id);
    const setAvatar = useProfile(state => state.setAvatar);
    const avatarRefUrl = useRef<string | null>(null);

    const queryClient = useQueryClient();
    const { data, status } = useQuery({
        queryKey: ['avatar', id],
        queryFn: async () => {
            try {
                if (id) {
                    return await UserService.getImage(id);
                }
            } catch {
                notify('error', 'Failed to load avatar');
                return null
            } finally {
                if (status === 'success') notify('success', 'Avatar successfully loaded');
            }
        },
        enabled: Boolean(id),
        staleTime: Infinity,
        gcTime: Infinity,
    });

    useEffect(() => {
        if (!data) return;

        avatarRefUrl.current = URL.createObjectURL(data);
        setAvatar(avatarRefUrl.current);

    }, [data, setAvatar])


    const MAX_SIZE = 5 * 1024 * 1024;

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

        try {
            setIsUploading(true);
            await UserService.uploadImage(file);
            await queryClient.refetchQueries({ queryKey: ['avatar', id] })
        } catch (e) {
            if (e instanceof Error) {
                notify("error", e.message);
            }
        } finally {
            setIsUploading(false);
        }
    }

    const clearAvatar = () => {
        if (avatarRefUrl.current) {
            URL.revokeObjectURL(avatarRefUrl.current)
            avatarRefUrl.current = null;
            setAvatar(null);
        }
    }

    return { handleChange, isUploading, clearAvatar }
}