/**
 * Save behavior depends on editor mode (create / edit)
 */

'use client';

import { useCreateTest } from '@/entities/test-operation/hooks/useCreateTest';
import { useEditTest } from '@/entities/test-operation/hooks/useEditTest';
import { SpinnerForBtn } from '@/shared/ui/spinner/SpinnerForBtn';
import clsx from 'clsx';
import { useShallow } from 'zustand/shallow';
import { useTest } from '../model/store';

import styles from '@/styles/blocks/create.module.scss';


export const CreateOperation = ({ mode }: { mode: string | null }) => {
    const { test, indicator, testMeta } = useTest(useShallow((state) => ({
        test: state.test,
        indicator: state.indicator,
        testMeta: state.testMeta,
    })));
    const { handleSaveTest, handleDecline, isPending } = useCreateTest();
    const { handleSaveEditTest, isPendingEdit } = useEditTest(testMeta);

    return (
        <div className={styles.create__operation}>
            <button
                className={styles.create__decline}
                onClick={handleDecline}>
                Decline</button>

            <div className={clsx(styles.create__indicator, indicator && styles.changes)}>
                <div className={styles.create__indicator_circle}></div>
                <div className={styles.create__indicator_title}>Unsaved changes</div>
            </div>

            <button
                className={styles.create__save}
                disabled={!test.length || isPending || isPendingEdit}
                onClick={mode !== 'edit' ? handleSaveTest : handleSaveEditTest}>
                Save{(isPending || isPendingEdit) && <SpinnerForBtn />}</button>

        </div>
    )
}
