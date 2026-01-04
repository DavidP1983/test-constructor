'use client';

import { useLoginForm } from '@/features/auth/login/model/store';
import { useTest } from '@/features/test-actions/save-question/model/store';
import styles from '@/styles/blocks/profile.module.scss';
import { daysSinceLastLogin } from '../utils/daysSinceLastLogin';


export const UserStats = () => {
    const userTestData = useLoginForm(state => state.userTestData);
    const userInfo = useLoginForm(state => state.userData);
    const totalCreatedTests = useTest(state => state.totalCreatedTests);
    const lastActivity = daysSinceLastLogin(userInfo);
    return (
        <div className={styles.profile__statistics}>
            <h2 className={styles.profile__subtitle}><i className="icon-chart-line"></i> Statistics</h2>
            <div className={styles.profile__statistics_desc}>
                <div className="desc">Tests - {userTestData?.length} total</div>
                <div className="desc">Today - {totalCreatedTests} created</div>
                <div className="desc">Last Activity  - {lastActivity ? `${lastActivity} days` : "Today"} </div>
            </div>
        </div>
    )
}