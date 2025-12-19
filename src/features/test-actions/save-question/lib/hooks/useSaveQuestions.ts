/**
 * Manages creation and editing of questions and answers inside a test.
 *
 * Responsibilities:
 * - Collects and validates input/select fields for questions and answers
 * - Builds question structure before saving to the store
 * - Handles add / edit / delete operations for questions and answers
 * - Controls edit mode state for a specific question
 * - Shows validation and conflict errors (e.g. radio answer conflicts)
 *
 * Behavior depends on `testId`:
 * - If `testId` is undefined → creates a new question
 * - If `testId` is provided → works with existing question answers
 *
 * This hook does NOT perform API calls.
 * All persistence logic is delegated to the test store.
 */

'use client';

import { useModal } from "@/entities/modal/model/store";
import { Test, TestError } from "@/shared/types/test-type";
import { useState } from "react";
import { type SingleValue } from "react-select";
import Swal from 'sweetalert2';
import { useShallow } from "zustand/shallow";
import { useTest } from "../../model/store";


export const useSaveQuestions = (testId?: string) => {
    const [fields, setFields] = useState<TestError>({ select: null, input: '' });
    const [questions, setQuestions] = useState<Test>(
        {
            id: '',
            type: '',
            title: '',
            instructions: '',
            options: []
        }
    );

    // Store Test
    const { addTest, addAnswer, deleteAnswer, editAnswer, editField, deleteTest } = useTest(useShallow((state) => ({
        addTest: state.addTest,
        addAnswer: state.addAnswer,
        deleteAnswer: state.deleteAnswer,
        editAnswer: state.editAnswer,
        deleteTest: state.deleteTest,
        editField: state.editField,
    })));

    // Store Modal
    const openModal = useModal(state => state.openModal);


    // Toggle поля при исправлении 
    const editFieldToggle = editField.questionId === testId && editField.opened;


    // Проверка на заполнение полей
    const checkFields = (option: SingleValue<{ value: string | boolean; label: string }> | string | null, key: 'input' | 'select') => {
        setFields(prev => ({ ...prev, [key]: option }))
    }

    // Сбор данных поля input
    const handleInputData = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const target = e.currentTarget.getAttribute('name');
        const value = e.currentTarget.value.charAt(0).toLocaleUpperCase() + e.currentTarget.value.slice(1);

        checkFields(value, "input");

        if (target === 'title') {
            setQuestions(prev => ({ ...prev, [`${target}`]: value }))
        } else {
            setQuestions(prev => (
                {
                    ...prev,
                    options: [{ id: '', question: value, answer: false }]
                }))
        }
    }

    // Сбор данных поля select
    const handleSelectData = (newValue: SingleValue<{ value: string | boolean; label: string; }>) => {
        const value = newValue?.value;

        checkFields(newValue, "select");

        if (typeof (value) === 'string') {
            setQuestions(prev => ({ ...prev, type: value || '' }))
        } else {
            setQuestions(prev => {
                const opts = [...prev.options];
                opts[opts.length - 1] = {
                    ...opts[opts.length - 1],
                    answer: value!
                }
                return { ...prev, options: opts }
            })
        }
    }

    // Сохранение вопроса
    const handleSaveQuestion = () => {
        addTest(questions);
        openModal(false);
        setFields({ input: '', select: null })
    }

    // Сохранение ответов
    const handleSaveAnswers = () => {
        if (testId) {
            const result = addAnswer(questions.options, testId);
            if (result?.error === "radio_conflict") {
                Swal.fire({
                    icon: 'error',
                    title: "Only one answer should be true in this option",
                    html: `The answer <strong>"${result.answer}"</strong> already true`,
                    timer: 2000
                })
            }
            setFields({ input: '', select: null })
        }
    }

    // Удаление конкретного ответа в карточке
    const handleDeleteAnswer = (answerId: string) => {
        if (testId) {
            deleteAnswer(testId, answerId)
        }
    }

    // Исправление ответа
    const handleEditData = () => {
        const question = questions.options[0].question;
        const answer = questions.options[0].answer;
        if (testId) {
            const result = editAnswer(question, answer, testId);
            if (result?.error === "radio_conflict") {
                Swal.fire({
                    icon: 'error',
                    title: "Only one answer should be true in this option",
                    html: `The answer <strong>"${result.answer}"</strong> already true`,
                    timer: 2000
                })
            }
            setFields({ input: '', select: null })
        }
    }

    // Удаление карточки с вопросами
    const handleDeleteQuestion = () => {
        Swal.fire({
            icon: "warning",
            title: "Warning",
            text: "Do you want to delete this question",
            showCloseButton: true,
            showDenyButton: true,
            denyButtonText: 'Deny',
            confirmButtonText: "Confirm"
        }).then((res) => {
            if (testId && res.isConfirmed) {
                deleteTest(testId)
            }
        })
    }


    return {
        isReadyToSave: !Object.values(fields).every(Boolean),
        fields,
        setFields,
        questions,
        editField,
        editFieldToggle,
        handleInputData,
        handleSelectData,
        handleSaveQuestion,
        handleSaveAnswers,
        handleDeleteAnswer,
        handleEditData,
        handleDeleteQuestion,
    }
}


