

import styles from '@/styles/blocks/profile.module.scss';
// { actions }: { actions: React.ReactNode }
interface Props {
    changePassword: React.ReactNode;
    deleteAccount: React.ReactNode
}

export const UserSecurity = ({ changePassword, deleteAccount }: Props) => {

    return (
        <div className={styles.profile__security}>
            <h2 className={styles.profile__subtitle}><i className="icon-lock"></i> Security</h2>
            {changePassword}
            <hr />
            <h3 className={styles.profile__security_danger}><i className="icon-warning-empty"></i> Danger zone</h3>
            {deleteAccount}
        </div>
    )
}