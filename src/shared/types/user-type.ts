import { NotificationWarningType } from "./notificationWarning-type";

export interface User {
    id: string;
    name: string;
    email: string;
    hasAvatar: boolean;
    role: "Admin" | "User";
    joined: string;
    notifications: NotificationWarningType | null;
    lastActivity: string;
    lastLogin?: string | null;
    feedbackSubmitted?: boolean;
}

export interface DataArgs {
    name: string;
    email: string;
    password: string;
}

