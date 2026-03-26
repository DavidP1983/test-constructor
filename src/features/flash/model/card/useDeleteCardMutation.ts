import { FLASHCARDS_QUERY_KEY } from "@/entities/flash/model/queryKeys";
import { FlashCardsType, GeneralFlashType } from "@/entities/flash/types/flashTypes";
import { api } from "@/entities/test-operation/api/apiService";
import { notify } from "@/shared/utils/notify";
import { useMutation, useQueryClient } from "@tanstack/react-query";


const useDeleteCardMutation = (folderDataId: string) => {

    type UpdateType<T> = Partial<T>;
    const queryClient = useQueryClient();

    const updateCardMutation = useMutation({

        mutationFn: async (cardId: string) => (
            await api.delete<UpdateType<FlashCardsType>>(`/flashcards/delete-card/${folderDataId}/card/${cardId}`)
        ),

        onMutate: async (deletedId) => {
            await queryClient.cancelQueries({ queryKey: FLASHCARDS_QUERY_KEY });

            const previousData = queryClient.getQueryData(FLASHCARDS_QUERY_KEY);

            queryClient.setQueryData(FLASHCARDS_QUERY_KEY, (old: GeneralFlashType[]) => {
                if (!old) return old;
                return old.map(folder => {
                    if (folder._id !== folderDataId) return folder;
                    return {
                        ...folder,
                        cards: folder.cards?.filter(card => card._id !== deletedId)
                    }
                });
            });

            return { previousData }
        },
        onSuccess: async () => {
            await notify("success", `The card was deleted successfully`);
        },
        onError: async (_, __, context) => {
            if (context?.previousData) {
                queryClient.setQueryData(FLASHCARDS_QUERY_KEY, context?.previousData)
            }
        },
    });

    return {
        deleteCardMutation: updateCardMutation.mutate,
        isPendingDelete: updateCardMutation.isPending
    };

}

export default useDeleteCardMutation;