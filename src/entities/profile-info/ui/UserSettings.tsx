import Link from "next/link";


import styles from '@/styles/blocks/profile.module.scss';

export const UserSettings = ({ actions }: { actions: React.ReactNode }) => {

    return (
        <div className={styles.profile__settings}>
            <h2 className={styles.profile__subtitle}><i className="icon-cog"></i> Settings</h2>
            <div className={styles.profile__settings_notifications}>
                <div className={styles.profile__settings_link}>
                    <Link
                        href="/builder/completed"
                        aria-label="notification"
                        className="desc">Notifications - 0 completed tests</Link>
                </div>
                {actions}
            </div>
        </div>
    )
}