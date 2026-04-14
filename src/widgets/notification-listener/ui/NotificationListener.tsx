'use client';

import { api } from "@/entities/test-operation/api/apiService";
import { useLoginForm } from "@/features/auth/login/model/store";
import { User } from "@/shared/types/user-type";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";
import { useAdminNotification } from "../model/useAdminNotification";


const NotificationListener = () => {
    const { showAdminNotification } = useAdminNotification();
    const { userData, authStep } = useLoginForm(useShallow((state) => ({
        authStep: state.authStep,
        userData: state.userData,
    })));

    const { data } = useQuery({
        queryKey: ['notifications'],
        queryFn: async () => {
            try {
                return await api.get<User>('/notifications/get-notification')
            } catch (e) {
                console.error('Notification fetch error', e);
                return null;
            }
        },
        enabled: !!userData?.id && authStep === 'authenticated',
        staleTime: 60000,
        refetchInterval: 60000,
        refetchIntervalInBackground: false
    });

    useEffect(() => {
        const notification = data?.notifications;

        if (!notification || notification?.isRead) return;
        showAdminNotification();

    }, [data]);


    return null;
}

export default NotificationListener;


