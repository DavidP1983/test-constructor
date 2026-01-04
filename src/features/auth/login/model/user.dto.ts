import { User } from "@/shared/types/user-type";

export const userDTO = (data: User) => {
    return {
        id: data.id,
        name: data.name,
        email: data.email,
        role: data.role,
        joined: data.joined,
        notifications: data.notifications,
        lastLogin: data.lastLogin,
        lastActivity: data.lastActivity
    }
}