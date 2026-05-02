import { FLASHCARDS_QUERY_KEY } from "@/entities/flash/flash-folders/api/queryKeys";
import { GeneralFlashType } from "@/entities/flash/types/flashTypes";
import { api } from "@/entities/test-operation/api/apiService";
import { useMutation, useQueryClient } from "@tanstack/react-query";


const useUpdateFolderMutation = (folderDataId: string) => {

    type UpdateType<T> = Partial<T>;
    const queryClient = useQueryClient();

    const updateFolderMutation = useMutation({

        mutationFn: async (data: UpdateType<GeneralFlashType>) => (
            await api.patch<GeneralFlashType, UpdateType<GeneralFlashType>>(`/flashcards/update-folder/${folderDataId}`, data)
        ),

        onMutate: async (updatedFolder) => {
            await queryClient.cancelQueries({ queryKey: FLASHCARDS_QUERY_KEY });

            const previousFolder = queryClient.getQueryData<GeneralFlashType[]>(FLASHCARDS_QUERY_KEY);

            queryClient.setQueryData<GeneralFlashType[]>(FLASHCARDS_QUERY_KEY, (old) => {
                if (!old) return [];
                return old.map(folder => folder._id === updatedFolder._id ? { ...folder, ...updatedFolder } : folder);
            });
            return { previousFolder }
        },
        onError: async (_, __, context) => {
            queryClient.setQueryData(FLASHCARDS_QUERY_KEY, context?.previousFolder)
        },

        onSettled: () => queryClient.invalidateQueries({
            queryKey: FLASHCARDS_QUERY_KEY
        })
    });

    return { updateFolderMutation: updateFolderMutation.mutateAsync };
}

export default useUpdateFolderMutation;