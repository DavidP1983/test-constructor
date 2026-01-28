'use client';

import { useTest } from '@/features/test-actions/save-question/model/store';
import { useRouter } from 'next/navigation';

import styles from '@/styles/blocks/navigation.module.scss';


export const BackButton = ({ children, to }: { children: React.ReactNode, to: string }) => {
    const router = useRouter();
    const resetTest = useTest(state => state.resetTest);


    return (
        <button
            className={styles.btn__back}
            onClick={() => {
                resetTest()
                router.push(to)
            }}>
            &#8592; {children}
        </button>
    )
}