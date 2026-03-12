"use client";
import { useCreateAccessesLink } from "@/entities/test-operation/hooks/useCreateAccessesLink";
import { useLoginForm } from "@/features/auth/login/model/store";
import { useSendWarningNotification } from "@/features/warning-notification/model/useSendWarningNotification";
import { useRouter } from "next/navigation";
import { useDeleteTest } from "../../../entities/test-operation/hooks/useDeleteTest";


export const TableActions = ({ testId, authorId }: { testId: string, authorId: string | undefined }) => {
    const { handleDelete } = useDeleteTest();
    const { handleCreateLink } = useCreateAccessesLink();
    const { handleSendWarningNotification } = useSendWarningNotification();
    const userData = useLoginForm(state => state.userData);
    const router = useRouter();

    const isNotOwner = userData?.id !== authorId;

    return (
        <>
            <button
                className="icon-link-ext btn"
                data-btn="Link"
                aria-label="link-icon"
                disabled={isNotOwner}
                onClick={() => handleCreateLink(testId)}></button>
            <button
                className="icon-pencil btn"
                data-btn="Edit"
                aria-label="edit-icon"
                disabled={isNotOwner}
                onClick={() => router.push(`builder/${testId}?mode=edit`)}></button>
            <button
                className="icon-trash-empty btn"
                data-btn="Delete"
                aria-label="trash-icon"
                onClick={() => handleDelete(testId)}></button>
            {
                userData?.role === 'Admin' && isNotOwner && (
                    <button
                        className="icon-chat-empty btn"
                        data-btn="Chat"
                        aria-label="chat-icon"
                        onClick={() => handleSendWarningNotification(authorId)}
                    ></button>

                )
            }
        </>
    )
}