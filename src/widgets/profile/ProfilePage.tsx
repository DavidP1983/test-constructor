'use client';

import { UserInfo } from "@/entities/profile-info/ui/UserInfo";
import { UserSecurity } from "@/entities/profile-info/ui/UserSecurity";
import { UserSettings } from "@/entities/profile-info/ui/UserSettings";
import { UserStats } from "@/entities/profile-info/ui/UserStats";
import { ChangeAvatarButton } from "@/features/profile/change-avatar/ui/ChangeAvatarButton";
import { ChangeThemeButtons } from "@/features/profile/change-theme/ui/ChangeThemeButtons";
import { ChangePasswordButton } from "@/features/profile/user-security/ui/ChangePasswordButton";
import { DeleteAccountButton } from "@/features/profile/user-security/ui/DeleteAccountButton";
import { motion } from "motion/react";
import { profileVariants } from "./animations";

import styles from '@/styles/blocks/profile.module.scss';

export const ProfilePage = () => {

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
                            />
                        </motion.div>

                        <motion.div
                            className={styles.profile__settings}
                            variants={profileVariants}
                            initial="initialRight"
                            animate="readySettings">
                            <UserSettings
                                actions={<ChangeThemeButtons />} />
                        </motion.div>

                        <motion.div
                            className={styles.profile__statistics}
                            variants={profileVariants}
                            initial="initialLeft"
                            animate="readyStats"
                        >
                            <UserStats />
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