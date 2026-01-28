
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

export interface AllTests {
    _id: string;
    id: string;
    authorId: string | undefined;
    name: string;
    creator: string;
    createdAt: string | null;
    participantsCount: number;
    test: Test[];
}

export interface TestError {
    input?: string;
    select?: { value: string | boolean; label: string } | null;
}

export type TestMeta = Omit<AllTests, "test">