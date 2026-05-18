/* eslint-disable @typescript-eslint/no-unused-vars */
import { queries } from "@/entities/flash-card";
import { FlashCardsType } from "@/entities/flash-card/model/types/card.types";
import { GeneralFlashType } from "@/entities/flash-folder/model/types/folder.types";
import { api } from "@/entities/test-operation/api/apiService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { v4 as uuidv4 } from 'uuid';
import { useFlashCardStore } from "../store";


export const useCreateMutation = (folderDataId: string) => {
    const setIsCardCreated = useFlashCardStore(state => state.setIsCardCreated);
    type UpdateType<T> = Partial<T>;
    const queryClient = useQueryClient();

    const createMutation = useMutation({

        mutationFn: async (data: UpdateType<FlashCardsType>) => (
            await api.patch<FlashCardsType, UpdateType<FlashCardsType>>(`/flashcards/create-card/${folderDataId}`, data)
        ),

        onMutate: async (newCard) => {
            const queryKey = queries.mutationKey(folderDataId).queryKey;
            await queryClient.cancelQueries({ queryKey });
            const previousFolder = queryClient.getQueryData<GeneralFlashType>(queryKey);

            const optimisticCard = {
                _id: uuidv4(),
                ...newCard
            } as FlashCardsType

            queryClient.setQueryData<GeneralFlashType>(queryKey,
                (old) => {
                    if (!old) return old;
                    return {
                        ...old,
                        cards: [...(old.cards ?? []), optimisticCard]
                    }
                });

            return { previousFolder }
        },

        onSuccess: (serverFolder, _, __) => {
            const queryKey = queries.mutationKey(folderDataId).queryKey;
            queryClient.setQueryData<GeneralFlashType>(queryKey, (old) => {
                if (!old) return old
                return {
                    ...old,
                    ...serverFolder
                }
            });
            setIsCardCreated(true);
        },

        onError: (_, __, context) => {
            const queryKey = queries.mutationKey(folderDataId).queryKey;
            queryClient.setQueryData(queryKey, context?.previousFolder);
        },
    });


    return {
        createMutation: createMutation.mutateAsync,
        isPendingCreate: createMutation.isPending,
    };
}


