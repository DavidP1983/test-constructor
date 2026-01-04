
export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
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

export type UserDTO = Omit<User, "password">