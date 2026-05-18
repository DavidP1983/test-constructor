import { GeneralFlashType } from "@/entities/flash-folder/model/types/folder.types";
import { api } from "@/entities/test-operation/api/apiService";
import { queryOptions } from "@tanstack/react-query";


const FLASH_CARD_KEY = 'flashCard';

export const queries = {
    getFolder: (slug: string, serverFolderData: GeneralFlashType) => {
        const endpoint = 'get-folder';

        return queryOptions({
            queryKey: [FLASH_CARD_KEY, slug],
            queryFn: async ({ signal }) => await api.get<GeneralFlashType>(`/flashcards/${endpoint}/${slug}`, signal),
            staleTime: 2 * 60 * 1000,
            initialData: serverFolderData,
        });
    },

    mutationKey: (slug: string) => {
        return {
            queryKey: [FLASH_CARD_KEY, slug]
        }
    }
}

