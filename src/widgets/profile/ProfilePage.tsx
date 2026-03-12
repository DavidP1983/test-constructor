'use client';

import { OnboardingRules } from "@/entities/onboarding-rules/ui/OnboardingRules";
import { UserInfo } from "@/entities/profile-info/ui/userInfo/UserInfo";
import { UserSecurity } from "@/entities/profile-info/ui/userSecurity/UserSecurity";
import { UserSettings } from "@/entities/profile-info/ui/userSettings/UserSettings";
import { UserStats } from "@/entities/profile-info/ui/userStats/UserStats";
import { api } from "@/entities/test-operation/api/apiService";
import { useLoginForm } from "@/features/auth/login/model/store";
import { ChangeAvatarButton } from "@/features/profile/change-avatar/ui/ChangeAvatarButton";
import { ChangeThemeButtons } from "@/features/profile/change-theme/ui/ChangeThemeButtons";
import { ShowNotification } from "@/features/profile/show-notification/ui/ShowNotification";
import { ChangePasswordButton } from "@/features/profile/user-security/ui/ChangePasswordButton";
import { DeleteAccountButton } from "@/features/profile/user-security/ui/DeleteAccountButton";
import Accordion from "@/shared/ui/accordion/ui/Accordion";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { profileVariants } from "./animations";
import { AdminsStatsType } from "./types/admins.stats.type";

import styles from '@/styles/blocks/profile.module.scss';


export const ProfilePage = () => {
    const userData = useLoginForm(state => state.userData);
    const { data, isLoading, isFetching } = useQuery({
        queryKey: ['adminStats'],
        queryFn: async ({ signal }) => await api.get<AdminsStatsType>('/user/admin-stats', signal),
        enabled: userData?.role === 'Admin',
        staleTime: 1 * 1000 * 60,
        refetchOnWindowFocus: true
    });

    return (
        <main className={styles.profile}>
            <section aria-labelledby="profile information" className={styles.profile__section}>
                <motion.h1
                    className={styles.profile__title}
                    initial={{ y: -40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}>
                    Profile
                </motion.h1>
                <div className="container">
                    <div className={styles.profile__wrapper}>

                        <motion.div
                            className={styles.profile__content}
                            variants={profileVariants}
                            initial="initialLeft"
                            animate="readyInfo">
                            <UserInfo
                                actions={<ChangeAvatarButton />}
                                reviewRulesAction={
                                    <Accordion>
                                        <Accordion.Item
                                            title="Rules"
                                            index={0}>
                                            <OnboardingRules />
                                        </Accordion.Item>
                                    </Accordion>
                                }
                            />
                        </motion.div>

                        <motion.div
                            className={styles.profile__settings}
                            variants={profileVariants}
                            initial="initialRight"
                            animate="readySettings">
                            <UserSettings
                                actions={<ChangeThemeButtons />}
                                notification={<ShowNotification />} />
                        </motion.div>

                        <motion.div
                            className={styles.profile__statistics}
                            variants={profileVariants}
                            initial="initialLeft"
                            animate="readyStats"
                        >
                            <UserStats
                                adminStats={data}
                                isDataLoading={isLoading}
                                isDataFetching={isFetching} />
                        </motion.div>

                        <motion.div
                            className={styles.profile__security}
                            variants={profileVariants}
                            initial="initialRight"
                            animate="readySecurity">
                            <UserSecurity
                                changePassword={<ChangePasswordButton />}
                                deleteAccount={<DeleteAccountButton />} />
                        </motion.div>
                    </div>
                </div>
            </section>
        </main>
    )
}