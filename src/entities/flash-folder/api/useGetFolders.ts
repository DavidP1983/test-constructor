import { queries } from "@/entities/flash-folder";
import { useQuery } from "@tanstack/react-query";

export const useGetFolders = () => {
    const { data, isLoading, isFetching, error } = useQuery({
        ...queries.getFolders()
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