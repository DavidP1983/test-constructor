'use client';

import { useTest } from "@/features/test-actions/save-question/model/store";
import { AllTests, Test } from "@/shared/types/test-type";
import { DropResult } from "@hello-pangea/dnd";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";
import { Mode } from "../ui/renderActions";


export const useReorderQuestions = (singleTest: AllTests | undefined) => {
    const { test, setTests, resetTest, reorder } = useTest(useShallow((state) => ({
        test: state.test,
        setTests: state.setTests,
        resetTest: state.resetTest,
        reorder: state.reorder
    })));
    const mode = useSearchParams().get('mode') as Mode;
    const data = mode === 'preview' ? singleTest?.test : test;


    useEffect(() => {
        resetTest();
        if (mode === 'edit' && singleTest) {
            setTests(singleTest)
        }
    }, []);


    const reorderItems = (list: Test[], startIndex: number, endIndex: number) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };


    const onDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return;
        }

        const items = reorderItems(
            test,
            result.source.index,
            result.destination.index
        );
        reorder(items);
    }


    return { data, mode, onDragEnd }
}