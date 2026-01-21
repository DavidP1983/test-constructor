'use client';

import { useAvatar } from '@/entities/profile-info/model/useAvatar';
import styles from '@/styles/blocks/profile.module.scss';


export const ChangeAvatarButton = () => {
    const { handleChange, isUploading } = useAvatar();

    return (
        <div className={styles.profile__info_file}>
            <label htmlFor="file" className={styles.profile__info_upload}>{isUploading ? "Uploading..." : 'Change avatar'}</label>
            <input
                type="file"
                disabled={isUploading}
                className="profile__avatar"
                id="file"
                onChange={handleChange}
                hidden />
        </div>
    )
}