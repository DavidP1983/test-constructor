import { queries } from "@/entities/flash-folder";
import { GeneralFlashType } from "@/entities/flash-folder/model/types/folder.types";
import { api } from "@/entities/test-operation/api/apiService";
import { notify } from "@/shared/utils/notify";
import { notifyDuringOperation } from "@/shared/utils/notifyDuringOperation";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export const useDeleteFolder = () => {
    const queryClient = useQueryClient();

    const deleteFolderMutation = useMutation({
        mutationFn: async (id: string) => await api.delete<GeneralFlashType>(`/flashcards/delete-folder/${id}`),

        async onMutate(deleteId) {
            await queryClient.cancelQueries({ ...queries.mutationKey() });

            let deletedItem;

            queryClient.setQueriesData<GeneralFlashType[]>({ ...queries.mutationKey() }, (old) => {
                deletedItem = old?.find(elem => elem._id === deleteId);
                return old ? old?.filter(folder => folder._id !== deleteId) : [];
            });

            return { deletedItem }
        },

        onError() {
            queryClient.invalidateQueries({ ...queries.mutationKey() })
            notify('error', 'Something went wrong, try again')
        },

        onSuccess(_, __, context) {
            if (context.deletedItem) {
                const { title } = context.deletedItem;
                notify('success', `${title} was was deleted successfully`);
            }
        }
    });

    const handleDeleteFolder = async (id: string) => {
        const configNotification = {
            title: 'Are you sure you want to delete this folder ?',
            text: 'This action cannot be undone.',
            icon: 'warning',
            btnText: 'Delete'
        } as const;

        await notifyDuringOperation(configNotification).then((result) => {
            if (result.isConfirmed) {
                deleteFolderMutation.mutate(id)
            }
        });
    }

    return { handleDeleteFolder }
}