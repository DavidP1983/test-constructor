import { AllTests } from "@/shared/types/test-type";
import Header from "../header/ui/Header";
import { TestManage } from "../test-manage/TestManage";


export const TetsEditorPage = ({ singleTest }: { singleTest: AllTests }) => {

    return (
        <>
            <Header />
            <TestManage
                title={singleTest.name}
                singleTest={singleTest} />
        </>
    )
}
