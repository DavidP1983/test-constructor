import { FLASHCARDS_QUERY_KEY } from "@/entities/flash/model/queryKeys";
import { FlashCardsType, GeneralFlashType } from "@/entities/flash/types/flashTypes";
import { api } from "@/entities/test-operation/api/apiService";
import { useMutation, useQueryClient } from "@tanstack/react-query";


const useUpdateCardMutation = (folderDataId: string, cardId: string) => {

    type UpdateType<T> = Partial<T>;
    const queryClient = useQueryClient();

    const updateCardMutation = useMutation({

        mutationFn: async (data: UpdateType<FlashCardsType>) => (
            await api.patch<FlashCardsType, UpdateType<FlashCardsType>>(`/flashcards/update-card/${folderDataId}/card/${cardId}`, data)
        ),

        onMutate: async (updatedCard) => {
            await queryClient.cancelQueries({ queryKey: FLASHCARDS_QUERY_KEY });
            const previousCardData = queryClient.getQueryData<GeneralFlashType[]>(FLASHCARDS_QUERY_KEY);

            queryClient.setQueryData<GeneralFlashType[]>(FLASHCARDS_QUERY_KEY, (old) => {
                if (!old) return old;
                return old.map(folder => {
                    if (folder._id !== folderDataId) return folder;
                    return {
                        ...folder,
                        cards: folder.cards?.map(c => c._id === cardId ?
                            { ...c, ...updatedCard } : c
                        )
                    }
                });
            });

            return { previousCardData }
        },
        onError: async (_, __, context) => {
            queryClient.setQueryData(FLASHCARDS_QUERY_KEY, context?.previousCardData)
        },
    });

    return {
        updateCardMutation: updateCardMutation.mutateAsync,
        isPendingUpdate: updateCardMutation.isPending
    };

}

export default useUpdateCardMutation;