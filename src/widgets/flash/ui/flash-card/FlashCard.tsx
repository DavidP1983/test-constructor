'use client';
/*
   Здесь мы берём актуальные данные из React Query (useGetFolders),
   потому что folderData — это первоначальные данные (например, с сервера при заходе на страницу)
   и они не обновляются после мутаций.

   После добавления карточки мы обновляем кеш через setQueryData (optimistic update),
   поэтому в useGetFolders уже лежат свежие данные.

   Поэтому:
   - сначала ищем папку в кеше (data)
   - если её ещё нет (например, первый рендер) — используем folderData как fallback
  */
import { useGetFolders } from "@/entities/flash/model/useGetFolders";
import { GeneralFlashType } from "@/entities/flash/types/flashTypes";
import { FolderFormProvider } from "@/features/flash/model/context/FolderFormProvider";
import { FlashCardContent } from "./FlashCardContent";


export const FlashCard = ({ folderData, mode }: { folderData: GeneralFlashType, mode: 'create' | 'edit' }) => {
    const { data } = useGetFolders();
    const folder = data.find(folder => folder._id === folderData._id) ?? folderData;

    return (
        <FolderFormProvider folderData={folder} mode={mode}>
            <FlashCardContent />
        </FolderFormProvider>
    )
}