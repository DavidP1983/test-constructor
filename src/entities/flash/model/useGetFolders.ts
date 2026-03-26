import { api } from "@/entities/test-operation/api/apiService";
import { useQuery } from "@tanstack/react-query";
import { GeneralFlashType } from "../types/flashTypes";
import { FLASHCARDS_QUERY_KEY } from "./queryKeys";

export const useGetFolders = () => {

    const { data, isLoading, isFetching, error } = useQuery({
        queryKey: FLASHCARDS_QUERY_KEY,
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