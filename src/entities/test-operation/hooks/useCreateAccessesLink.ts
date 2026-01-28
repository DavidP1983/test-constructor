import { TableService } from "@/features/table-actions/services/TableService";
import { notify } from "@/shared/utils/notify";

export const useCreateAccessesLink = () => {

    const handleCreateLink = async (id: string) => {
        try {
            const { url } = await TableService.createLink(id);
            await navigator.clipboard.writeText(url);
            notify('success', 'Link was successfully copied');
        } catch {
            notify('error', 'Oops... try again');
        }

    }

    return { handleCreateLink }

}