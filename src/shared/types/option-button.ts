export interface OptionButton {
    label: string;
    answerId: string;
    questionId: string;
    mode?: string | null;
    onChange?: (answerId: string, questionId: string, type: 'radio' | 'checkbox') => void | undefined
}