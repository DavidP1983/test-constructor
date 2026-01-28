"use client";
import { useCreateAccessesLink } from "@/entities/test-operation/hooks/useCreateAccessesLink";
import { useRouter } from "next/navigation";
import { useDeleteTest } from "../../../entities/test-operation/hooks/useDeleteTest";


export const TableActions = ({ testId }: { testId: string }) => {
    const { handleDelete } = useDeleteTest();
    const { handleCreateLink } = useCreateAccessesLink();
    const router = useRouter();

    return (
        <>
            <button
                className="icon-link-ext btn"
                data-btn="Link"
                aria-label="link-icon"
                onClick={() => handleCreateLink(testId)}></button>
            <button
                className="icon-pencil btn"
                data-btn="Edit"
                aria-label="edit-icon"
                onClick={() => router.push(`builder/${testId}?mode=edit`)}></button>
            <button
                className="icon-trash-empty btn"
                data-btn="Delete"
                aria-label="trash-icon"
                onClick={() => handleDelete(testId)}></button>
        </>
    )
}