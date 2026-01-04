'use client';

import { useAvatar } from '@/entities/profile-info/model/useAvatar';
import styles from '@/styles/blocks/profile.module.scss';


export const ChangeAvatarButton = () => {
    const { handleChange } = useAvatar();

    return (
        <div className={styles.profile__info_file}>
            <label htmlFor="file" className={styles.profile__info_upload}>Change avatar</label>
            <input
                type="file"
                className="profile__avatar"
                id="file"
                onChange={handleChange}
                hidden />
        </div>
    )
}