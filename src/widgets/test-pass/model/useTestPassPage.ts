import { AnswerItem } from "@/shared/types/completed-type";
import { AllTests } from "@/shared/types/test-type";
import { notify } from "@/shared/utils/notify";
import { showResultAlert } from "@/shared/utils/showResultAlert";
import { useState } from "react";
import { CompletedTestService } from "./CompletedTestService";
import { useCompletedTestsStore } from "./store";

export const useTestPassPage = (data: AllTests, linkId: string) => {

    const [answers, setAnswers] = useState<AnswerItem[]>([]);
    const [candidateName, setCandidateName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const calculateCompletedTests = useCompletedTestsStore(state => state.calculateCompletedTests);

    const channel = new BroadcastChannel('completed-tests');

    // Сбор данных теста
    const handleChange = (answerId: string, questionId: string, type: 'radio' | 'checkbox') => {

        setAnswers(prev => {
            const existing = prev.find(item => item.questionId === questionId);

            // --- RADIO --- //
            if (type === 'radio') {
                // Если есть такой questionId, то мы обновляем объект
                if (existing) {
                    return prev.map(item =>
                        item.questionId === questionId
                            ?
                            { ...item, selectedOptions: [answerId] }
                            : item
                    )
                }

                // Если нет такого questionId, то просто добавляем
                return [...prev, { questionId, selectedOptions: [answerId] }]
            }

            // --- CHECKBOX --- //
            if (existing) {
                const exists = existing.selectedOptions.includes(answerId);
                return prev.map(item =>
                    item.questionId === questionId
                        ?
                        {
                            ...item,
                            selectedOptions:
                                exists ?
                                    existing.selectedOptions.filter(id => id !== answerId) // Когда кликаю второй раз на checkbox удаляю элемент из массива ответов, если он уже там есть
                                    : [...existing.selectedOptions, answerId]   // Если ответа такого нет, то добавляю его
                        }
                        : item
                )
            }
            return [...prev, { questionId, selectedOptions: [answerId] }]
        })
    }

    // Отправка данных 
    const handleSaveAnswers = async () => {

        let correctAnswers = 0;
        data.test.forEach(({ id, options }, i) => {
            if (id === answers[i]?.questionId) {
                const originAnswers = options.filter(item => item.answer).map(item => item.id);
                const isCorrectId = answers[i].selectedOptions.every((item) => originAnswers.includes(item));
                if (originAnswers.length === answers[i].selectedOptions.length && isCorrectId) {
                    correctAnswers += 1;
                }
            }
        });

        const score = Math.floor((correctAnswers / data.test.length) * 100);
        const status: 'passed' | 'failed' = score >= 70 ? 'passed' : 'failed';

        const resData = {
            accessToken: linkId,
            id: data.id,
            testName: data.name,
            candidateName,
            totalQuestions: data.test.length,
            correctAnswers,
            score,
            status,
            answers
        }

        if (!candidateName) {
            notify('error', 'Please provide your name')
            return
        }

        try {
            setIsLoading(true);
            const { success } = await CompletedTestService.crateAnswer(resData);
            if (success) {
                channel.postMessage({ type: 'TEST_COMPLETED', token: linkId });   // данный по отображению bell и сбор token: linkId  обрабатывается в Header
                calculateCompletedTests();
                showResultAlert('success', 'Completed', 'You have successfully completed the test. We will let you know your results soon.')
            }
        } catch {
            showResultAlert('error', 'Error', 'If you encounter an error, contact us and we will send you another link.')
        } finally {
            setIsLoading(false)
        }
    }

    return {
        setCandidateName,
        isLoading,
        handleChange,
        handleSaveAnswers
    }
}