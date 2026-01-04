'use client';
import Image from "next/image";
import { useProfile } from '../model/store';

import { useLoginForm } from "@/features/auth/login/model/store";
import styles from '@/styles/blocks/profile.module.scss';


export const UserInfo = ({ actions }: { actions: React.ReactNode }) => {
    const avatar = useProfile(state => state.avatar);
    const userInfo = useLoginForm(state => state.userData);


    return (
        <>
            <div className={styles.profile__info}>
                <div className={styles.profile__info_image}>
                    <Image
                        src={avatar ?? "/assets/user-icon.webp"}
                        alt="user"
                        priority
                        fetchPriority="high"
                        width={100}
                        height={100}
                    />
                </div>
                <ul className={styles.profile__info_data}>
                    <li className={styles.profile__info_item}>Name/Nickname: {userInfo?.name}</li>
                    <li className={styles.profile__info_item}>Email: {userInfo?.email}</li>
                    <li className={styles.profile__info_item}>Role: {userInfo?.role}</li>
                    <li className={styles.profile__info_item}>Joined: {userInfo?.joined} </li>
                </ul>

            </div>
            {actions}
        </>
    )
}