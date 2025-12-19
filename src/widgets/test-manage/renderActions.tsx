import { AddQuestionModal } from "@/entities/modal/ui/AddQuestionModal";
import { BackButton } from "@/features/navigation/ui/BackButton";
import { AddQuestionForm } from "@/features/test-actions/add-form/ui/AddQuestionForm";
import { CreateOperation } from "@/features/test-actions/save-question/ui/CreateOperation";

export type Mode = "create" | "preview" | "edit";
export const renderActions = (mode: Mode) => {
    switch (mode) {
        case "preview":
            return <BackButton />
        case "edit":
            return (
                <>
                    <AddQuestionModal>
                        <AddQuestionForm />
                    </AddQuestionModal>
                    <CreateOperation mode={mode} />
                </>
            )
        default:
            return (
                <>
                    <AddQuestionModal>
                        <AddQuestionForm />
                    </AddQuestionModal>
                    <CreateOperation mode={mode} />
                </>
            )
    }
}