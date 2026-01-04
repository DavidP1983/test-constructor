
export interface Options {
    id: string;
    question: string;
    answer: boolean;
}
export interface Test {
    id: string;
    type: string;
    title: string | undefined;
    instructions: string;
    options: Options[];
}

interface Result {
    totalQuestions: number;
    answers: number;
}

export interface AllTests {
    id: string;
    authorId: string | undefined;
    name: string;
    createdAt: string | null;
    participantsCount: number;
    test: Test[];
    result: Result;
}

export interface TestError {
    input?: string;
    select?: { value: string | boolean; label: string } | null;
}

export interface ActionButtonProps {
    label: string;
    answerId: string;
    questionId: string;
    mode: string | null;
}

export type TestMeta = Omit<AllTests, "test">