'use client';

import { AllTests, Options, Test, TestMeta } from '@/shared/types/test-type';
import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { hasRadioConflict } from '../lib/utils/hasRadioConflict';


interface EditData {
    questionId: string;
    answerId: string;
    opened: boolean;
    label: string;
}

interface ErrorType {
    answer: string;
    error: string;
}


interface TestStore {
    test: Test[];
    testMeta: TestMeta | null;
    error: string;
    editField: EditData;
    indicator: boolean;
    openField: () => void;
    addTest: (data: Test) => void;
    addAnswer: (answers: Options[], testId: string) => ErrorType;
    deleteAnswer: (testId: string, id: string) => void;
    openEditor: (questionId: string, answerId: string, label: string) => void;
    editAnswer: (question: string, answer: boolean, testId: string) => ErrorType;
    deleteTest: (id: string) => void;
    setTests: (data: AllTests) => void;
    reorder: (test: Test[]) => void;
    resetTest: () => void;
}

export const useTest = create<TestStore>()(persist(devtools((set, get) => ({
    test: [],
    testMeta: {},
    editField: {},
    error: '',
    indicator: false,

    // Создание Теста
    addTest: (data: Test) => {
        set({
            test: [
                ...get().test,
                {
                    ...data,
                    id: uuidv4(),
                    instructions: data.type === 'radio' ? 'Один вариант ответа' : 'Несколько вариантов'
                }]
        });
        set({ indicator: true });
    },

    // Добавление Ответов к созданному тесту
    addAnswer: (answers: Options[], testId: string) => {
        const id = uuidv4().split('-')[0];
        answers[0].id = id;

        const test = get().test.find(item => item.id === testId);
        if (test?.type === 'radio') {
            const conflict = hasRadioConflict(test.options, answers[0].answer);
            if (conflict) {
                return { error: "radio_conflict", answer: conflict.question }
            }
        }
        set({
            test: get().test.map(item =>
                item.id === testId
                    ? { ...item, options: [...item.options, ...answers] }
                    : item
            )
        });
        set({ indicator: true });
    },

    // Удаление Ответа
    deleteAnswer: (testId: string, id: string) => {
        set({
            test: get().test.map(item =>
                item.id === testId
                    ? { ...item, options: item.options.filter(item => item.id !== id) }
                    : item
            )
        });
        set({ indicator: true });
    },

    // Открытие полей
    openEditor: (questionId: string, answerId: string, label: string) => {
        set({ editField: { questionId, answerId, opened: !get().editField.opened, label } })
    },

    // Модификация Ответа
    editAnswer: (question: string, answer: boolean, testId: string) => {
        const editFiledId = get().editField.answerId;

        const test = get().test.find(item => item.id === testId);
        if (test?.type === 'radio') {
            const conflict = hasRadioConflict(test.options, answer);
            if (conflict) {
                return { error: "radio_conflict", answer: conflict.question }
            }
        }

        set({
            test: get().test.map(item =>
                item.id === testId
                    ? { ...item, options: item.options.map(item => item.id === editFiledId ? { ...item, question, answer } : item) }
                    : item
            )
        })
        set({ indicator: true });
        set({ editField: { ...get().editField, opened: false } })
    },


    // Удаление Теста
    deleteTest: (id: string) => {
        set({
            test: get().test.filter(item => item.id !== id)
        });
        set({ indicator: true });
    },

    // Добавление в test данных, при динамических страницах
    setTests: (data: AllTests) => {
        set({
            testMeta:
            {
                id: data.id,
                name: data.name,
                participantsCount: data.participantsCount,
                result: data.result
            }
        })
        set({ test: [...get().test, ...data.test] })
    },

    // Drag & Drop  операции
    reorder: (data: Test[]) => {
        set({ test: data });
        set({ indicator: true });
    },
    // Очищение созданного теста после сохранения
    resetTest: () => {
        set({ test: [] });
        set({ testMeta: null })
        set({ indicator: false });
    },


}), { store: "tests", enabled: process.env.NODE_ENV === 'development' }), { name: 'useTest', version: 1 }))


