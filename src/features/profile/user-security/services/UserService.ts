import { apiFetch } from "@/shared/api/apiFetch";

export class UserService {

    static async changePassword(oldPassword: string, newPassword: string): Promise<void> {

        const response = await apiFetch(`${process.env.NEXT_PUBLIC_API_URL}/user/update`,
            {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ oldPassword, newPassword })
            }
        )

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Password update failed')
        }
    }

    static async deleteAccount(password: string) {

        const response = await apiFetch(`${process.env.NEXT_PUBLIC_API_URL}/user/delete`,
            {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password })
            }
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Request failed');
        }
    }

    static async uploadImage(file: File) {
        const data = new FormData();
        data.append('avatar', file);
        const response = await apiFetch(`${process.env.NEXT_PUBLIC_API_URL}/user/upload`,
            {
                method: 'POST',
                body: data
            }
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'File upload failed');
        }
    }

    static async getImage(id: string) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${id}/avatar`, { cache: 'no-store' });

        if (response.status === 204) return null;

        if (!response.ok) {
            throw new Error('Failed to retrieve avatar image');
        }
        return await response.blob();  // Buffer
    }
}

