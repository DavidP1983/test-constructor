
export type AnswerItem = {
    questionId: string;
    selectedOptions: string[];
}


export interface CompletedTest {
    _id?: string;
    accessToken: string;
    id: string;
    authorId?: string;
    testName: string;
    candidateName: string;
    totalQuestions: number;
    correctAnswers: number;
    completedAt?: string;
    duration?: number;
    score: number;
    status: 'passed' | 'failed';
    answers: AnswerItem[]
}
