import { queries } from "@/entities/flash-card";
import { GeneralFlashType } from "@/entities/flash-folder/model/types/folder.types";
import { api } from "@/entities/test-operation/api/apiService";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export const useUpdateFolderMutation = (folderDataId: string) => {

    type UpdateType<T> = Partial<T>;
    const queryClient = useQueryClient();

    const updateFolderMutation = useMutation({

        mutationFn: async (data: UpdateType<GeneralFlashType>) => (
            await api.patch<GeneralFlashType, UpdateType<GeneralFlashType>>(`/flashcards/update-folder/${folderDataId}`, data)
        ),

        onMutate: async (updatedFolder) => {
            const queryKey = queries.mutationKey(folderDataId).queryKey;
            await queryClient.cancelQueries({ queryKey });

            const previousFolder = queryClient.getQueryData<GeneralFlashType>(queryKey);

            queryClient.setQueryData<GeneralFlashType>(queryKey,
                (old) => {
                    if (!old) return old;
                    return {
                        ...old,
                        ...updatedFolder
                    }
                });
            return { previousFolder }
        },
        onError: async (_, __, context) => {
            const queryKey = queries.mutationKey(folderDataId).queryKey;
            queryClient.setQueryData(queryKey, context?.previousFolder)
        },

        onSettled: () => {
            const queryKey = queries.mutationKey(folderDataId).queryKey;
            queryClient.invalidateQueries({ queryKey })
        }
    });

    return { updateFolderMutation: updateFolderMutation.mutateAsync };
}

