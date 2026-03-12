import { api } from "@/entities/test-operation/api/apiService";
import { useLoginForm } from "@/features/auth/login/model/store";
import { useQuery } from "@tanstack/react-query";
import { AdminsStatsType } from "../types/admins.stats.type";

export const useProfilePageModel = () => {
    const userData = useLoginForm(state => state.userData);
    const { data, isLoading, isFetching } = useQuery({
        queryKey: ['adminStats'],
        queryFn: async ({ signal }) => await api.get<AdminsStatsType>('/user/admin-stats', signal),
        enabled: userData?.role === 'Admin',
        staleTime: 1 * 1000 * 60,
        refetchOnWindowFocus: true
    });

    return { data, isLoading, isFetching }
}