import { LoginForm } from "@/features/auth/login/ui/LoginForm";
import { Spinner } from "@/shared/ui/spinner/Spinner";
import { Metadata } from "next";
import { Suspense } from "react";

import styles from '@/styles/blocks/form.module.scss';


export const metadata: Metadata = {
  title: "Test Constructor",
  description: "Build interactive quizzes, track progress, and share with friends or students easily. Sign up or log in to start creating tests today.",
};

export default function Home() {

  return (
    <>
      <Suspense fallback={<Spinner isFallback={true} />}>
        <main className={styles.auth} >
          <h1 className='title'>Create, Customize, and Share Tests with Ease</h1>
          <p className={styles.auth__subtitle}>
            Build interactive tests, track progress, and share with friends or students instantly.
          </p>
          <div className="container">
            <LoginForm />
          </div>
        </main>
      </Suspense>
    </>
  );
}
