import { api } from "@/entities/test-operation/api/apiService";
import { queryOptions } from "@tanstack/react-query";
import { GeneralFlashType } from "../model/types/folder.types";


const FLASH_FOLDER_KEY = 'flashFolder';

export const queries = {
    getFolders: () => {
        const endpoint = 'get-folders';

        return queryOptions({
            queryKey: [FLASH_FOLDER_KEY],
            queryFn: async ({ signal }) => await api.get<GeneralFlashType[]>(`/flashcards/${endpoint}`, signal),
            staleTime: 2 * 60 * 1000,
            refetchOnMount: true
        });
    },

    mutationKey: () => {
        return {
            queryKey: [FLASH_FOLDER_KEY]
        }
    }
}