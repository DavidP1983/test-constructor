'use client';

import { useRouter } from 'next/navigation';

import { useTest } from '@/features/test-actions/save-question/model/store';
import styles from '@/styles/blocks/create.module.scss';



export const BackButton = () => {
    const router = useRouter();
    const resetTest = useTest(state => state.resetTest);


    return (
        <div className={styles.create__operation}>
            <button
                className={styles.btn__back}
                onClick={() => {
                    resetTest()
                    router.push('/profile')
                }}>
                &#8592; Back
            </button>
        </div>

    )
}