import { FLASHCARDS_QUERY_KEY } from "@/entities/flash/model/queryKeys";
import { FlashCardsType, GeneralFlashType } from "@/entities/flash/types/flashTypes";
import { api } from "@/entities/test-operation/api/apiService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { v4 as uuidv4 } from 'uuid';


const useCreateMutation = (folderDataId: string) => {

    type UpdateType<T> = Partial<T>;
    const queryClient = useQueryClient();

    const createMutation = useMutation({

        mutationFn: async (data: UpdateType<FlashCardsType>) => (
            await api.patch<FlashCardsType, UpdateType<FlashCardsType>>(`/flashcards/create-card/${folderDataId}`, data)
        ),

        onMutate: async (newCard) => {
            await queryClient.cancelQueries({ queryKey: FLASHCARDS_QUERY_KEY });
            const previousFolder = queryClient.getQueryData<GeneralFlashType[]>(FLASHCARDS_QUERY_KEY);

            const optimisticCard = {
                _id: uuidv4(),
                ...newCard
            }

            queryClient.setQueryData<GeneralFlashType[]>(FLASHCARDS_QUERY_KEY, (old) => {
                if (!old) return old;
                return old.map(folder => folder._id === folderDataId ? { ...folder, cards: [...(folder.cards ?? []), optimisticCard as FlashCardsType] } : folder);
            });

            return { previousFolder }
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onSuccess: async (serverFolder, _, __) => {
            queryClient.setQueryData(FLASHCARDS_QUERY_KEY, (old: GeneralFlashType[]) => {
                if (!old) return old;

                return old.map(folder =>
                    folder._id === folderDataId
                        ? serverFolder
                        : folder
                );
            });
        },
        onError: async (_, __, context) => {
            queryClient.setQueryData(FLASHCARDS_QUERY_KEY, context?.previousFolder)
        },
    });


    return {
        createMutation: createMutation.mutateAsync,
        isPendingCreate: createMutation.isPending
    };
}

export default useCreateMutation;

