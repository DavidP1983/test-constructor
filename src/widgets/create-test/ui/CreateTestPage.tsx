'use client';
import Header from "@/widgets/header/ui/Header";
import { TestManage } from "@/widgets/test-manage/TestManage";


export const CreateTestPage = () => {
    return (
        <>
            <Header />
            <TestManage title="Create new Test" />
        </>
    )
}

