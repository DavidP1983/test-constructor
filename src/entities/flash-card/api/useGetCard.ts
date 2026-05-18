import { GeneralFlashType } from "@/entities/flash-folder/model/types/folder.types";
import { useQuery } from "@tanstack/react-query";
import { queries } from "./queries";

export const useGetCard = (slug: string, serverFolderData: GeneralFlashType) => {
    const { data } = useQuery({
        ...queries.getFolder(slug, serverFolderData)
    });


    return {
        data: data ?? serverFolderData,
    }
}