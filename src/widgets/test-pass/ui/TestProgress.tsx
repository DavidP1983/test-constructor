import { Test } from '@/shared/types/test-type';
import Image from "next/image";
import Steps from 'rc-steps';
import 'rc-steps/assets/index.css';


import styles from '@/styles/blocks/progress.module.scss';

export const TestProgress = ({ total, current }: { total: Test[], current: number }) => {

    return (
        <div className={styles.progress}>
            <Steps
                current={current}
                direction='horizontal'
                items={total.map((_, i) => ({
                    title: `Question ${i + 1}`,
                    icon: (
                        <div
                            style={{
                                width: 24,
                                height: 24,
                                borderRadius: '50%',
                                backgroundColor: i <= current ? '#1890ff' : '#e9e9e9',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#fff',
                                transition: 'all 0.2s',
                                fontSize: 12,
                            }}
                        >
                            {
                                total.length - 1 !== i
                                    ?
                                    i + 1
                                    :
                                    <Image
                                        src="/assets/check-4.png"
                                        alt='check'
                                        width={24}
                                        height={24} />
                            }
                        </div>
                    ),
                }))}
            />
        </div>
    )
}
