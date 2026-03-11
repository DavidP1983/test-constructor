import styles from '@/styles/blocks/profile.module.scss';

export const UserSettings = ({ actions, notification }: { actions: React.ReactNode, notification: React.ReactNode }) => {

    return (
        <>
            <h2 className={styles.profile__subtitle}><i className="icon-cog"></i> Settings</h2>
            <div className={styles.profile__settings_notifications}>
                {notification}
                {actions}
            </div>
        </>
    )
}