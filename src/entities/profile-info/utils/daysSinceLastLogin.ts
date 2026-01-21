import { User } from "@/shared/types/user-type";
import { differenceInDays } from "date-fns";

export const daysSinceLastLogin = (userInfo: User | null): number => {
    if (userInfo?.lastLogin) {
        const days = differenceInDays(
            new Date(),
            new Date(userInfo?.lastLogin)
        );
        return days
    }
    return 0
}