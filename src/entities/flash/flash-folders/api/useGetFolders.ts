import { api } from "@/entities/test-operation/api/apiService";
import { bookQueries } from "@/shared/config/queries";
import { useQuery } from "@tanstack/react-query";
import { GeneralFlashType } from "../../types/flashTypes";

export const useGetFolders = () => {

    const { data, isLoading, isFetching, error } = useQuery({
        ...bookQueries.flashCard(),
        queryFn: async ({ signal }) => await api.get<GeneralFlashType[]>('/flashcards/get-folders', signal),
        staleTime: 2 * 60 * 1000,
        refetchOnMount: true
    });

    let status: "loading" | "error" | "success";
    if (isLoading || isFetching) {
        status = 'loading'
    } else if (error) {
        status = 'error'
    } else {
        status = 'success'
    }

    return {
        data: data ?? [],
        status,
        error
    }
}