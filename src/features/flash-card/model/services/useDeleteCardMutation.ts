import { queries } from "@/entities/flash-card";
import { FlashCardsType } from "@/entities/flash-card/model/types/card.types";
import { GeneralFlashType } from "@/entities/flash-folder/model/types/folder.types";
import { api } from "@/entities/test-operation/api/apiService";
import { notify } from "@/shared/utils/notify";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export const useDeleteCardMutation = (folderDataId: string) => {

    type UpdateType<T> = Partial<T>;
    const queryClient = useQueryClient();

    const deleteCardMutation = useMutation({

        mutationFn: async (cardId: string) => (
            await api.delete<UpdateType<FlashCardsType>>(`/flashcards/delete-card/${folderDataId}/card/${cardId}`)
        ),

        onMutate: async (deletedId) => {
            const queryKey = queries.mutationKey(folderDataId).queryKey;
            await queryClient.cancelQueries({ queryKey });

            const previousData = queryClient.getQueryData<GeneralFlashType>(queryKey);

            queryClient.setQueryData<GeneralFlashType>(queryKey,
                (old) => {
                    if (!old) return old;
                    return {
                        ...old,
                        cards: old.cards?.filter(card => card._id !== deletedId)
                    }
                });


            return { previousData }
        },
        onSuccess: async () => {
            await notify("success", `The card was deleted successfully`);
        },
        onError: async (_, __, context) => {
            const queryKey = queries.mutationKey(folderDataId).queryKey;
            if (context?.previousData) {
                queryClient.setQueryData(queryKey, context?.previousData)
            }
        },
    });

    return {
        deleteCardMutation: deleteCardMutation.mutate,
        isPendingDelete: deleteCardMutation.isPending
    };

}

