import { queries } from "@/entities/flash-card";
import { FlashCardsType } from "@/entities/flash-card/model/types/card.types";
import { GeneralFlashType } from "@/entities/flash-folder/model/types/folder.types";
import { api } from "@/entities/test-operation/api/apiService";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export const useUpdateCardMutation = (folderDataId: string, cardId: string) => {

    type UpdateType<T> = Partial<T>;
    const queryClient = useQueryClient();

    const updateCardMutation = useMutation({

        mutationFn: async (data: UpdateType<FlashCardsType>) => (
            await api.patch<FlashCardsType, UpdateType<FlashCardsType>>(`/flashcards/update-card/${folderDataId}/card/${cardId}`, data)
        ),

        onMutate: async (updatedCard) => {
            const queryKey = queries.mutationKey(folderDataId).queryKey;

            await queryClient.cancelQueries({ queryKey });
            const previousCardData = queryClient.getQueryData<GeneralFlashType>(queryKey);

            queryClient.setQueryData<GeneralFlashType>(queryKey,
                (old) => {
                    if (!old) return old;
                    return {
                        ...old,
                        cards: old.cards?.map((c) =>
                            c._id === cardId ? { ...c, ...updatedCard } : c
                        )
                    }
                });


            return { previousCardData }
        },
        onError: async (_, __, context) => {
            const queryKey = queries.mutationKey(folderDataId).queryKey;
            queryClient.setQueryData(queryKey, context?.previousCardData)
        },
    });

    return {
        updateCardMutation: updateCardMutation.mutateAsync,
        isPendingUpdate: updateCardMutation.isPending
    };

}

