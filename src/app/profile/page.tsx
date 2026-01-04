import Header from "@/widgets/header/ui/Header";
import { ProfilePage } from "@/widgets/profile/ProfilePage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Profile Page",
    description: "Profile page",
};


export default async function Profile() {
    return (
        <>
            <Header />
            <ProfilePage />
        </>
    )
}