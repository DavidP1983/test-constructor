import { CompletedTestsPage } from "@/widgets/completedTest-page/CompletedTestsPage";
import Header from "@/widgets/header/ui/Header";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "List of all completed tests",
    description: "Completed tests",
};


export default async function ProfileCompleted() {
    return (
        <>
            <Header />
            <CompletedTestsPage />
        </>
    )
}