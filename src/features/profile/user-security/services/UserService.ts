import { apiFetch } from "@/shared/api/apiFetch";
import { handleResponse } from "@/shared/api/handleResponse";

export class UserService {

    static async changePassword(oldPassword: string, newPassword: string) {

        const response = await apiFetch(`/user/update`,
            {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ oldPassword, newPassword })
            }
        )

        await handleResponse<void>(response, 'Password update failed');

    }


    static async deleteAccount(password: string) {

        const response = await apiFetch(`/user/delete`,
            {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password })
            }
        );

        await handleResponse<void>(response, 'Account deletion failed')

    }


    static async uploadImage(file: File) {
        const data = new FormData();
        data.append('avatar', file);
        const response = await apiFetch(`/user/upload`,
            {
                method: 'POST',
                body: data
            }
        );

        await handleResponse<void>(response, 'File upload failed');

    }


    static async getImage(id: string) {
        const response = await fetch(`/user/${id}/avatar`, { cache: 'no-store' });

        if (response.status === 204) return null;

        if (!response.ok) {
            throw new Error('Failed to retrieve avatar image');
        }
        return await response.blob();  // Buffer
    }
}

