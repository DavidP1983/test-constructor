import { api } from "@/entities/test-operation/api/apiService";
import { User } from "@/shared/types/user-type";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export const useAdminNotification = () => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const showAdminNotification = async () => {

        const res = await Swal.fire({
            title: "Your received a new message from Admin, please take a look",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Open Profile',
            cancelButtonText: 'Later',
        });

        if (res.isConfirmed) {
            router.push('/profile');
        }

        try {
            await api.patch<User, object>("/notifications/mark-read", {});
            queryClient.invalidateQueries({ queryKey: ['notifications'] });
        } catch (e) {
            console.error("Failed to mark notification as read", e);
        }
    }

    return { showAdminNotification }
}
