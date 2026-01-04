'use client';

import { UserInfo } from "@/entities/profile-info/ui/UserInfo";
import { UserSecurity } from "@/entities/profile-info/ui/UserSecurity";
import { UserSettings } from "@/entities/profile-info/ui/UserSettings";
import { UserStats } from "@/entities/profile-info/ui/UserStats";
import { ChangeAvatarButton } from "@/features/profile/change-avatar/ui/ChangeAvatarButton";
import { ChangeThemeButtons } from "@/features/profile/change-theme/ui/ChangeThemeButtons";
import { ChangePasswordButton } from "@/features/profile/user-security/ui/ChangePasswordButton";
import { DeleteAccountButton } from "@/features/profile/user-security/ui/DeleteAccountButton";

import styles from '@/styles/blocks/profile.module.scss';

export const ProfilePage = () => {

    return (
        <main className={styles.profile}>
            <section aria-labelledby="profile information" className={styles.profile__section}>
                <h1 className={styles.profile__title}>Profile</h1>
                <div className="container">
                    <div className={styles.profile__wrapper}>
                        <UserInfo
                            actions={<ChangeAvatarButton />}
                        />

                        <UserSettings
                            actions={<ChangeThemeButtons />} />

                        <UserStats />

                        <UserSecurity
                            changePassword={<ChangePasswordButton />}
                            deleteAccount={<DeleteAccountButton />} />
                    </div>
                </div>
            </section>
        </main>
    )
}