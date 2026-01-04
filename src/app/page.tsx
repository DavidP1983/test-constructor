import { LoginForm } from "@/features/auth/login/ui/LoginForm";
import { Spinner } from "@/shared/ui/spinner/Spinner";
import { Metadata } from "next";
import { Suspense } from "react";


export const metadata: Metadata = {
  title: "Form Page",
  description: "Login form page",
};


export default function Home() {
  return (
    <>
      <Suspense fallback={<Spinner isFallback={true} />}>
        <LoginForm />
      </Suspense>
    </>
  );
}
