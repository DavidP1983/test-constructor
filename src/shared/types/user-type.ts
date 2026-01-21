
export interface User {
    id: string;
    name: string;
    email: string;
    hasAvatar: boolean;
    role: "Admin" | "User";
    joined: string;
    notifications: boolean;
    lastActivity: string;
    lastLogin?: string | null;
}

export interface DataArgs {
    name: string;
    email: string;
    password: string;
}

