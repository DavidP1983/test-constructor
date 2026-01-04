import { AllTests } from "@/shared/types/test-type";
import { TestManage } from "../../test-manage/TestManage";


export const TetsEditorPage = ({ singleTest }: { singleTest: AllTests }) => {

    return (
        <>
            <TestManage
                title={singleTest.name}
                singleTest={singleTest} />
        </>
    )
}
