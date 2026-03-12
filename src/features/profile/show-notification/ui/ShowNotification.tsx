import { User } from "@/shared/types/user-type";
import { useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { useState } from "react";

import styles from '@/styles/blocks/profile.module.scss';


export const ShowNotification = () => {
    const [shown, setShown] = useState(false);
    const queryClient = useQueryClient();
    const data = queryClient.getQueryData<User>(['notifications']);

    const handleShowMessage = () => {
        setShown(prev => !prev);
    }

    const classNames = clsx({
        ['icon-mail']: true,
        ['icon-envelope-open-o']: shown
    });
    return (
        <>
            <div className={styles.profile__settings_desc}>
                <h3 className={styles.profile__settings_title}>Notification - </h3>
                <div className={styles.profile__settings_envelope}>
                    <button
                        className={classNames}
                        onClick={handleShowMessage}
                        aria-label="show notification"></button>
                    <span>{data?.notifications ? 1 : 0}</span>
                </div>
            </div>
            <div className={clsx(styles.profile__settings_notify, shown ? styles.open : '')}>
                <div className={styles.inner}>

                    {
                        data?.notifications
                            ?
                            <>
                                <h3 className={styles.title}>⚠️ Warning from Admin</h3>
                                <p className={styles.desc}>{data?.notifications?.message}</p>
                                <div className={styles.info}>
                                    <div className={styles.date}>Sent: {data?.notifications?.createdAt}</div>
                                    <div className={styles.read}>Read</div>
                                </div>
                            </>
                            : "No notifications yet."
                    }

                </div>
            </div>
        </>
    )
}
