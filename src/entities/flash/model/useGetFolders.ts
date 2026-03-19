import { api } from "@/entities/test-operation/api/apiService";
import { useQuery } from "@tanstack/react-query";
import { GeneralFlashType } from "../types/flashTypes";

export const useGetFolders = () => {

    const { data, isLoading, isFetching, error } = useQuery({
        queryKey: ['flashCards'],
        queryFn: async ({ signal }) => await api.get<GeneralFlashType[]>('/flashcards/get-folders', signal),
        staleTime: 1 * 1000 * 60
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