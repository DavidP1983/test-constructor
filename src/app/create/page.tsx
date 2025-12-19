import { CreateTestPage } from "@/widgets/create-test/ui/CreateTestPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Create Test Page",
    description: "Create new test page",
};


export default function CreateNewTest() {
    return (
        <CreateTestPage />
    )
}
