import { FLASHCARDS_QUERY_KEY } from "@/entities/flash/flash-folders/api/queryKeys";
import { FlashCardsType } from "@/entities/flash/types/flashTypes";
import { api } from "@/entities/test-operation/api/apiService";
import { notify } from "@/shared/utils/notify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateStatusCardsMutation = (folderDataId: string) => {
    type UpdateType<T> = Partial<T>;
    const queryClient = useQueryClient();

    const updateCardMutation = useMutation({

        mutationFn: async (data: Record<string, 'known' | 'repeat'>) => (
            await api.patch<FlashCardsType, UpdateType<FlashCardsType>>(`/flashcards/update-card-status/${folderDataId}`, data)
        ),

        onSuccess: async () => {
            notify('success', 'Changes were successfully applied')
            queryClient.invalidateQueries({ queryKey: FLASHCARDS_QUERY_KEY });
        },
        onError: async (e) => {
            console.error(e)
        }
    });

    return {
        pending: updateCardMutation.isPending,
        updateCardStatusMutation: updateCardMutation.mutateAsync,
    };


}