'use client';

import { useLoginForm } from '@/features/auth/login/model/store';
import { useTest } from '@/features/test-actions/save-question/model/store';
import { AdminsStatsType } from '@/widgets/profile/types/admins.stats.type';
import { daysSinceLastLogin } from '../../utils/daysSinceLastLogin';
import { UserStatsSkeleton } from './UserStatsSkeleton';


import styles from '@/styles/blocks/profile.module.scss';
import clsx from 'clsx';

interface UserStatsProps {
    adminStats: AdminsStatsType | null | undefined;
    isDataLoading: boolean;
    isDataFetching: boolean;
}

export const UserStats = ({ adminStats, isDataLoading, isDataFetching }: UserStatsProps) => {
    const userTestData = useLoginForm(state => state.userTestData);
    const userInfo = useLoginForm(state => state.userData);
    const totalCreatedTests = useTest(state => state.totalCreatedTests);
    const lastActivity = daysSinceLastLogin(userInfo);

    const isAdmin = userInfo?.role === 'Admin';
    const classNames = clsx({
        [styles.profile__statistics_content]: isAdmin
    })

    return (
        <>
            <h2 className={styles.profile__subtitle}><i className="icon-chart-line"></i> Statistics</h2>
            <div className={classNames}>
                <div className={clsx(styles.profile__statistics_desc, styles.left)}>
                    <div className="desc" data-testid="desc">Tests - {userTestData?.length} total</div>
                    <div className="desc" data-testid="desc">Today - {totalCreatedTests} created</div>
                    <div className="desc" data-testid="desc">Last Activity  - {lastActivity ? `${lastActivity} days` : "Today"} </div>
                </div>

                {
                    isAdmin && (
                        <div className={clsx(styles.profile__statistics_desc, styles.right)}>
                            {
                                (isDataLoading || isDataFetching) ? (<UserStatsSkeleton />)
                                    :
                                    (
                                        <>
                                            <div className="stat_total">
                                                Total users - {adminStats?.totalUsers ?? 0}
                                            </div>
                                            <div className={styles.stat_online}>
                                                Total users online - {adminStats?.usersOnline ?? 0}
                                                <span></span>
                                            </div>
                                            <div className="stat_new">
                                                New register users - {adminStats?.newUsers ?? 0}
                                            </div>
                                        </>
                                    )
                            }
                        </div>
                    )
                }

            </div>
        </>
    )
}
