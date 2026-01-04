
import { useSaveQuestions } from "@/features/test-actions/save-question/lib/hooks/useSaveQuestions";
import { useTest } from "@/features/test-actions/save-question/model/store";


interface Props {
    questionId: string;
    answerId: string;
    label: string;
}

export const AnswerActions = ({ questionId, answerId, label }: Props) => {
    const { handleDeleteAnswer } = useSaveQuestions(questionId);
    const openEditor = useTest(state => state.openEditor);


    return (
        <div>
            <button
                className="icon-pencil btn"
                data-btn="Edit"
                aria-label="edit-icon"
                onClick={() => openEditor(questionId, answerId, label)}></button>
            <button
                className="icon-trash-empty btn"
                data-btn="Delete"
                aria-label="trash-icon"
                onClick={() => handleDeleteAnswer(answerId)}></button>
        </div>
    );
}