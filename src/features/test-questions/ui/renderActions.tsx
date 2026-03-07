import { BackButton } from "@/features/navigation/ui/BackButton";
import { AddQuestionFormLazy } from "@/features/test-actions/add-form/ui/AddQuestionFormLazy";
import { CreateOperation } from "@/features/test-actions/save-question/ui/CreateOperation";
import { Modal } from "@/shared/ui/modal/Modal";

export type Mode = "create" | "preview" | "edit" | 'pass';
export const renderActions = (mode: Mode) => {
    switch (mode) {
        case "preview":
            return <BackButton to={'/builder'}>Back</BackButton>
        case "edit":
            return (
                <>
                    <Modal>
                        <AddQuestionFormLazy />
                    </Modal>
                    <CreateOperation mode={mode} />
                </>
            )
        default:
            return (
                <>
                    <Modal>
                        <AddQuestionFormLazy />
                    </Modal>
                    <CreateOperation mode={mode} />
                </>
            )
    }
}