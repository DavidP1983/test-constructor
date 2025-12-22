'use client';
import dynamic from "next/dynamic";


export const AddQuestionFormLazy = dynamic(
    () => import('../ui/AddQuestionForm').then(m => m.AddQuestionForm),
    { ssr: false }
)