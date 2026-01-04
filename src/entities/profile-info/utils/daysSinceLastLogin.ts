import { UserDTO } from "@/shared/types/user-type";
import { differenceInDays } from "date-fns";

export const daysSinceLastLogin = (userInfo: UserDTO | null): number => {
    if (userInfo?.lastLogin) {
        const days = differenceInDays(
            new Date(),
            new Date(userInfo?.lastLogin)
        );
        return days
    }
    return 0
}