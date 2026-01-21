'use client';

import { useLoginForm } from "@/features/auth/login/model/store";
import Image from "next/image";
import { useProfile } from "../model/store";


import styles from '@/styles/blocks/profile.module.scss';


export const UserInfo = ({ actions }: { actions: React.ReactNode }) => {
    const userData = useLoginForm(state => state.userData);
    const avatar = useProfile(state => state.avatarUrl);

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
                    <li className={styles.profile__info_item}>Name/Nickname: {userData?.name}</li>
                    <li className={styles.profile__info_item}>Email: {userData?.email}</li>
                    <li className={styles.profile__info_item}>Role: {userData?.role}</li>
                    <li className={styles.profile__info_item}>Joined: {userData?.joined} </li>
                </ul>

            </div>
            {actions}
        </>
    )
}