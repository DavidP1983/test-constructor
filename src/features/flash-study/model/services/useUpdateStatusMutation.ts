import { queries } from "@/entities/flash-card";
import { FlashCardsType } from "@/entities/flash-card/model/types/card.types";
import { api } from "@/entities/test-operation/api/apiService";
import { notify } from "@/shared/utils/notify";
import { CollectStatusType } from "@/widgets/flash-study/model/types/flash.study.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UpdateType<T> = Partial<T>;

export const useUpdateStatusMutation = (folderDataId: string) => {
    const queryClient = useQueryClient();

    const updateCardMutation = useMutation({

        mutationFn: async (data: CollectStatusType) => (
            await api.patch<FlashCardsType, UpdateType<FlashCardsType>>(`/flashcards/update-card-status/${folderDataId}`, data)
        ),

        onSuccess: async () => {
            const queryKey = queries.mutationKey(folderDataId).queryKey;
            notify('success', 'Changes were successfully applied')
            queryClient.invalidateQueries({ queryKey: queryKey });
        },
        onError: async (e) => {
            notify('error', 'Failed to update status');
            console.error(e)
        }
    });

    return {
        pending: updateCardMutation.isPending,
        updateCardStatusMutation: updateCardMutation.mutateAsync,
    };


}