'use client';

import { useTest } from '@/features/test-actions/save-question/model/store';
import { useRouter } from 'next/navigation';

// import styles from '@/styles/blocks/create.module.scss';
import styles from '@/styles/blocks/navigation.module.scss';


export const BackButton = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const resetTest = useTest(state => state.resetTest);


    return (
        // <div className={styles.create__operation}>
        <button
            className={styles.btn__back}
            onClick={() => {
                resetTest()
                router.push('/builder')
            }}>
            &#8592; {children}
        </button>
        // </div>
    )
}