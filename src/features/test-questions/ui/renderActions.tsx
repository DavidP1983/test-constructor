import { AddQuestionModal } from "@/entities/modal/ui/AddQuestionModal";
import { BackButton } from "@/features/navigation/ui/BackButton";
import { AddQuestionFormLazy } from "@/features/test-actions/add-form/ui/AddQuestionFormLazy";
import { CreateOperation } from "@/features/test-actions/save-question/ui/CreateOperation";

export type Mode = "create" | "preview" | "edit";
export const renderActions = (mode: Mode) => {
    switch (mode) {
        case "preview":
            return <BackButton>Back</BackButton>
        case "edit":
            return (
                <>
                    <AddQuestionModal>
                        <AddQuestionFormLazy />
                    </AddQuestionModal>
                    <CreateOperation mode={mode} />
                </>
            )
        default:
            return (
                <>
                    <AddQuestionModal>
                        <AddQuestionFormLazy />
                    </AddQuestionModal>
                    <CreateOperation mode={mode} />
                </>
            )
    }
}